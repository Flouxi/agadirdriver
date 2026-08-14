import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/private-driver-agadir")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/private-driver-agadir"].title },
      { name: "description", content: SERVICE_PAGES["/private-driver-agadir"].description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" },
      { property: "og:image:alt", content: `${SERVICE_PAGES["/private-driver-agadir"].h1} image` },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/private-driver-agadir" }],
  }),
  component: () => <SeoLandingPage path="/private-driver-agadir" page={SERVICE_PAGES["/private-driver-agadir"]} />,
});
