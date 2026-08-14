import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/airport-transfer-taghazout")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/airport-transfer-taghazout"].title },
      { name: "description", content: SERVICE_PAGES["/airport-transfer-taghazout"].description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" },
      { property: "og:image:alt", content: `${SERVICE_PAGES["/airport-transfer-taghazout"].h1} image` },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/airport-transfer-taghazout" }],
  }),
  component: () => <SeoLandingPage path="/airport-transfer-taghazout" page={SERVICE_PAGES["/airport-transfer-taghazout"]} />,
});
