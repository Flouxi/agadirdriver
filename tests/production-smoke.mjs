import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// Exercise the exact bundled Vercel handler, including server rendering and Scripts.
const { default: app } = await import(
  pathToFileURL(resolve(".vercel/output/functions/__server.func/index.mjs"))
);
const date = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const query = new URLSearchParams({
  from: "Aéroport Agadir Al Massira (AGA)",
  to: "Hyatt Place Taghazout Bay",
  date,
  time: "13:45",
  pax: "2",
  type: "transfer",
  vehicleId: "economy-sedan",
});
for (const [path, marker] of [
  ["/", "booking-interface"],
  ["/reservation", "Choose your ride"],
  ["/reservation?" + query, "Choose your ride"],
  ["/checkout?" + query, "Lead passenger"],
]) {
  let url = new URL(path, "https://agadirdriver.com");
  let response;
  for (let redirects = 0; redirects < 5; redirects++) {
    response = await app.fetch(new Request(url));
    if (![301, 302, 303, 307, 308].includes(response.status)) break;
    url = new URL(response.headers.get("location"), url);
    assert.equal(url.origin, "https://agadirdriver.com", "Redirects must stay on site");
  }
  const html = await response.text();
  assert.equal(response.status, 200, path + " must render successfully: " + html.slice(0, 250));
  assert.ok(html.includes(marker), path + " must include its page content");
  assert.ok(html.includes("<script"), path + " must include hydration scripts");
  assert.ok(
    !html.includes("This page didn't load"),
    path + " must not render the fallback error page",
  );
  console.log("SSR OK", path.split("?")[0]);
}

// The first-party routing endpoint must be dispatched before the page renderer.
const invalidRoute = await app.fetch(
  new Request("https://agadirdriver.com/api/route?from=unknown&to=unknown"),
);
assert.equal(invalidRoute.status, 400);
assert.match(invalidRoute.headers.get("content-type"), /application\/json/);
console.log("Routing API OK");
