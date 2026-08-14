import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/agadir-airport-transfer")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/agadir-airport-transfer"].title },
      { name: "description", content: SERVICE_PAGES["/agadir-airport-transfer"].description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" },
      { property: "og:image:alt", content: `${SERVICE_PAGES["/agadir-airport-transfer"].h1} image` },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/agadir-airport-transfer" }],
  }),
  component: () => <SeoLandingPage path="/agadir-airport-transfer" page={SERVICE_PAGES["/agadir-airport-transfer"]} />,
});
