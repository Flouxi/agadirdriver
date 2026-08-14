import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/agadir-airport-taxi")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/agadir-airport-taxi"].title },
      { name: "description", content: SERVICE_PAGES["/agadir-airport-taxi"].description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" },
      { property: "og:image:alt", content: `${SERVICE_PAGES["/agadir-airport-taxi"].h1} image` },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/agadir-airport-taxi" }],
  }),
  component: () => <SeoLandingPage path="/agadir-airport-taxi" page={SERVICE_PAGES["/agadir-airport-taxi"]} />,
});
