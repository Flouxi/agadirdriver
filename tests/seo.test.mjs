import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const { default: app } = await import(
  pathToFileURL(resolve(".vercel/output/functions/__server.func/index.mjs"))
);
const origin = "https://agadirdriver.com";
const urls = [...readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
const titles = new Set();
function meta(html, name) {
  return [...html.matchAll(/<meta\s+([^>]+)>/g)]
    .map((m) =>
      Object.fromEntries([...m[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])),
    )
    .filter((a) => a.name === name || a.property === name)
    .map((a) => a.content);
}
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const french = pathname.startsWith("/fr/");
  const article =
    pathname.startsWith("/blog/") ||
    pathname === "/fr/prix-transfert-aeroport-agadir" ||
    pathname.startsWith("/fr/guides/");
  const response = await app.fetch(new Request(url));
  const html = await response.text();
  assert.equal(response.status, 200, url);
  for (const image of html.matchAll(/<img\b[^>]*\bsrc="([^"]*)"[^>]*>/g)) {
    if (image[1].startsWith("/assets/"))
      assert.ok(existsSync(resolve("public", "." + image[1])), "Local image exists: " + image[1]);
  }
  const title = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(title.length, 1, "One title: " + url);
  assert.ok(!titles.has(title[0][1]), "Unique title: " + url);
  titles.add(title[0][1]);
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, "One H1: " + url);
  for (const key of [
    "description",
    "og:title",
    "og:description",
    "og:url",
    "twitter:title",
    "twitter:description",
  ]) {
    assert.equal(meta(html, key).length, 1, "One " + key + ": " + url);
    assert.ok(meta(html, key)[0], "Nonempty " + key + ": " + url);
  }
  assert.equal(meta(html, "og:url")[0], url, "Page-specific social URL");
  assert.equal(meta(html, "og:title")[0], title[0][1], "Social title matches page");
  assert.equal(meta(html, "twitter:title")[0], title[0][1], "Twitter title matches page");
  assert.equal(
    meta(html, "og:description")[0],
    meta(html, "description")[0],
    "Social description matches page",
  );
  assert.ok(!meta(html, "robots").some((v) => v.includes("noindex")), "Sitemap page is indexable");
  assert.ok(html.includes('rel="canonical" href="' + url + '"'), "Self canonical: " + url);
  const blocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].map((m) => JSON.parse(m[1]));
  const entities = blocks.flatMap((value) => value["@graph"] ?? [value]);
  assert.ok(
    entities.some((e) => e["@type"] === "LocalBusiness"),
    "Existing real business entity",
  );
  if (!pathname.startsWith("/blog") && !article && url !== origin + "/") {
    assert.ok(
      entities.some((e) => e["@type"] === "Service" && e.url === url),
      "Service describes this page",
    );
    assert.ok(
      entities.some((e) => e["@type"] === "BreadcrumbList"),
      "Breadcrumbs represented",
    );
  }
  if (article)
    assert.ok(
      entities.some((e) => e["@type"] === "Article" && e.url === url),
      "Article URL and entity",
    );
  const faq = entities.find((e) => e["@type"] === "FAQPage");
  if (pathname !== "/blog") {
    assert.ok(faq && faq.mainEntity.length === 6, "Visible booking FAQ schema: " + url);
    const summaries = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) =>
      m[1].replace(/<[^>]*>/g, ""),
    );
    for (const question of faq.mainEntity)
      assert.ok(summaries.includes(question.name), "FAQ question matches visible content: " + url);
  }
  if (french) {
    assert.ok(/<html[^>]*lang="fr"/.test(html), "French language in server HTML");
    assert.ok(html.includes("Mon trajet est-il confirmé"), "French FAQ rendered on the server");
    const alternates = [...html.matchAll(/<link\s+([^>]+)>/g)]
      .map((m) =>
        Object.fromEntries(
          [...m[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1].toLowerCase(), a[2]]),
        ),
      )
      .filter((a) => a.rel === "alternate");
    assert.equal(alternates.length, 3, "English, French and default alternatives");
    assert.equal(alternates.find((a) => a.hreflang === "fr")?.href, url, "French self alternate");
    assert.ok(
      alternates.find((a) => a.hreflang === "en")?.href.startsWith(origin + "/"),
      "English counterpart",
    );
    const counterpart = await app.fetch(
      new Request(alternates.find((a) => a.hreflang === "en").href),
    );
    const englishHtml = await counterpart.text();
    assert.equal(counterpart.status, 200, "English counterpart returns 200");
    assert.ok(/<html[^>]*lang="en"/.test(englishHtml), "English counterpart rendered in English");
    assert.ok(
      englishHtml.includes('href="' + url + '"'),
      "English counterpart links back to French page",
    );
    assert.ok(
      html.includes('hrefLang="en"') ||
        html.includes('hrefLang="fr"') ||
        html.includes('hreflang="en"'),
      "Crawlable language links",
    );
  }
  console.log("SEO HTML OK", new URL(url).pathname);
}
assert.ok(!urls.some((url) => url.endsWith("/agadir-airport-taxi")), "Alias excluded from sitemap");
const redirect = await app.fetch(new Request(origin + "/agadir-airport-taxi?utm_source=qa"));
assert.equal(redirect.status, 301);
const destination = new URL(redirect.headers.get("location"), origin);
assert.equal(destination.pathname, "/agadir-airport-transfer");
assert.equal(destination.searchParams.get("utm_source"), "qa");
const missing = await app.fetch(new Request(origin + "/blog/not-a-published-guide-qa"));
assert.equal(missing.status, 404, "Unknown blog articles must be real 404s");
for (const path of ["/fr/not-a-published-page-qa", "/fr/guides/not-a-published-guide-qa"]) {
  assert.equal(
    (await app.fetch(new Request(origin + path))).status,
    404,
    "Unknown French page must be a real 404",
  );
}
const passengerQuery = new URLSearchParams({
  from: "Aéroport Agadir Al Massira (AGA)",
  to: "Riu Palace Tikida Taghazout",
  date: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
  time: "13:45",
  pax: "2",
  type: "transfer",
  vehicleId: "economy-sedan",
});
let checkoutUrl = new URL(origin + "/checkout?" + passengerQuery);
let checkout;
for (let hop = 0; hop < 5; hop++) {
  checkout = await app.fetch(new Request(checkoutUrl));
  if (![301, 302, 303, 307, 308].includes(checkout.status)) break;
  checkoutUrl = new URL(checkout.headers.get("location"), checkoutUrl);
  assert.equal(checkoutUrl.origin, origin);
}
assert.equal(checkout.status, 200);
assert.equal(checkoutUrl.pathname, "/checkout");
assert.ok(
  meta(await checkout.text(), "robots").includes("noindex"),
  "Request pages remain excluded",
);
console.log("SEO redirects, missing articles and transaction indexing OK");
