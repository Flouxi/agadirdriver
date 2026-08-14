import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/airport-transfer-tamraght")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/airport-transfer-tamraght"].title },
      { name: "description", content: SERVICE_PAGES["/airport-transfer-tamraght"].description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" },
      { property: "og:image:alt", content: `${SERVICE_PAGES["/airport-transfer-tamraght"].h1} image` },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/airport-transfer-tamraght" }],
  }),
  component: () => <SeoLandingPage path="/airport-transfer-tamraght" page={SERVICE_PAGES["/airport-transfer-tamraght"]} />,
});
