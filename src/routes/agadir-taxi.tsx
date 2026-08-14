import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/agadir-taxi")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/agadir-taxi"].title },
      { name: "description", content: SERVICE_PAGES["/agadir-taxi"].description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" },
      { property: "og:image:alt", content: `${SERVICE_PAGES["/agadir-taxi"].h1} image` },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/agadir-taxi" }],
  }),
  component: () => <SeoLandingPage path="/agadir-taxi" page={SERVICE_PAGES["/agadir-taxi"]} />,
});
