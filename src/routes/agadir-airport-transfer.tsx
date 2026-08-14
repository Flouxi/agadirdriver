import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/agadir-airport-transfer")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/agadir-airport-transfer"].title },
      { name: "description", content: SERVICE_PAGES["/agadir-airport-transfer"].description },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/agadir-airport-transfer" }],
  }),
  component: () => <SeoLandingPage path="/agadir-airport-transfer" page={SERVICE_PAGES["/agadir-airport-transfer"]} />,
});
