import { BUSINESS } from "../data/seo";
import { languagePair } from "./localized-paths";

export function seoHead({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const url = BUSINESS.url + path;
  const image = BUSINESS.url + "/assets/agadir88/hero-desktop-v2.jpg";
  const pair = languagePair(path);
  const french = path.startsWith("/fr/");
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:locale", content: french ? "fr_FR" : "en_GB" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: "Agadir Driver private transfers in Morocco" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: "Agadir Driver private transfers in Morocco" },
    ],
    links: [
      { rel: "canonical", href: url },
      ...(pair
        ? [
            { rel: "alternate", hrefLang: "en", href: BUSINESS.url + pair[0] },
            { rel: "alternate", hrefLang: "fr", href: BUSINESS.url + pair[1] },
            { rel: "alternate", hrefLang: "x-default", href: BUSINESS.url + pair[0] },
          ]
        : []),
    ],
  };
}

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
