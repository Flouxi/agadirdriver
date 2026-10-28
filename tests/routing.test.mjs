import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
const root = resolve(dirname(fileURLToPath(import.meta.url)), ".."),
  cache = join(root, ".quality-routing-cache");
for (const source of [
  "src/data/locations.ts",
  "src/lib/road-route.ts",
  "src/lib/route-handler.ts",
]) {
  const dest = join(cache, source.replace(/\.ts$/, ".mjs"));
  mkdirSync(dirname(dest), { recursive: true });
  const output = ts
    .transpileModule(readFileSync(join(root, source), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText.replace(
      /(from\s+["'])(\.[^"']+)(["'])/g,
      (_, before, name, after) => before + name.replace(/\.ts$/, "") + ".mjs" + after,
    );
  writeFileSync(dest, output);
}
process.on("exit", () => rmSync(cache, { recursive: true, force: true }));
const { parseRoadRoute, routeDuration } = await import(
  pathToFileURL(join(cache, "src/lib/road-route.mjs"))
);
const { createRouteHandler } = await import(
  pathToFileURL(join(cache, "src/lib/route-handler.mjs"))
);
const { ALL_LOCATIONS } = await import(pathToFileURL(join(cache, "src/data/locations.mjs")));
const airport = ALL_LOCATIONS.find((p) => p.id === "aga"),
  hotel = ALL_LOCATIONS.find((p) => p.label === "Hyatt Place Taghazout Bay");
const payload = () => ({
  code: "Ok",
  routes: [
    {
      distance: 44000,
      duration: 3120,
      geometry: {
        type: "LineString",
        coordinates: [
          [airport.lng, airport.lat],
          [hotel.lng, hotel.lat],
        ],
      },
    },
  ],
});
const request = (from = airport.id, to = hotel.id) =>
  new Request("https://agadirdriver.com/api/route?" + new URLSearchParams({ from, to }));
test("road geometry converts longitude/latitude once and preserves real distance and time", () => {
  const route = parseRoadRoute(payload(), airport.id, hotel.id);
  assert.deepEqual(route.coordinates[0], [airport.lat, airport.lng]);
  assert.deepEqual(route.coordinates[1], [hotel.lat, hotel.lng]);
  assert.equal(route.distanceMeters, 44000);
  assert.equal(route.durationSeconds, 3120);
  assert.deepEqual(routeDuration(3120), { hours: 0, minutes: 52 });
  assert.deepEqual(routeDuration(3599), { hours: 1, minutes: 0 });
});
test("missing, non-finite and malformed upstream routes never become a road preview", () => {
  for (const value of [
    null,
    { code: "NoRoute" },
    { code: "Ok", routes: [] },
    ...[
      [
        [10, 91],
        [20, 30],
      ],
      [
        [181, 30],
        [20, 30],
      ],
      [
        [0, null],
        [20, 30],
      ],
      [[0, 30]],
    ].map((coordinates) => ({
      code: "Ok",
      routes: [{ distance: 100, duration: 50, geometry: { type: "LineString", coordinates } }],
    })),
  ])
    assert.equal(parseRoadRoute(value, "a", "b"), null);
  const bad = payload();
  bad.routes[0].duration = -2;
  assert.equal(parseRoadRoute(bad, "a", "b"), null);
});
test("routing accepts only distinct catalog places and GET requests", async () => {
  let calls = 0;
  const handler = createRouteHandler(async () => {
    calls++;
    throw Error("must not run");
  });
  for (const req of [
    request("https://example.com/private", "aga"),
    request("unknown", hotel.id),
    request("aga", "aga"),
  ]) {
    const response = await handler(req);
    assert.equal(response.status, 400);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal((await handler(new Request(request().url, { method: "POST" }))).status, 405);
  assert.equal(calls, 0);
});
test("concurrent and repeated visits share a successful road lookup", async () => {
  let calls = 0,
    requested;
  const handler = createRouteHandler(async (url, options) => {
    calls++;
    requested = String(url);
    assert.ok(options.signal);
    await new Promise((resolve) => setTimeout(resolve, 5));
    return Response.json(payload());
  });
  const [a, b] = await Promise.all([handler(request()), handler(request())]);
  assert.equal(a.status, 200);
  assert.deepEqual(await a.json(), await b.json());
  const cached = await handler(request());
  assert.equal(cached.status, 200);
  assert.equal(calls, 1);
  assert.match(
    requested,
    new RegExp("/driving/" + airport.lng + "," + airport.lat + ";" + hotel.lng + "," + hotel.lat),
  );
  assert.match(cached.headers.get("cache-control"), /max-age=600/);
});
test("routing failures return a retryable response and do not poison the cache", async () => {
  let calls = 0;
  const handler = createRouteHandler(async () => {
    calls++;
    if (calls === 1) throw Error("offline");
    return Response.json(payload());
  });
  const failed = await handler(request());
  assert.equal(failed.status, 503);
  assert.equal(failed.headers.get("cache-control"), "no-store");
  assert.equal((await handler(request())).status, 200);
  assert.equal(calls, 2);
  const malformed = createRouteHandler(async () =>
    Response.json({
      code: "Ok",
      routes: [{ distance: 1, duration: 1, geometry: { type: "LineString", coordinates: [] } }],
    }),
  );
  assert.equal((await malformed(request())).status, 503);
});
