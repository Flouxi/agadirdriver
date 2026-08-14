import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";

export const Route = createFileRoute("/agadir-taxi")({
  head: () => ({
    meta: [
      { title: SERVICE_PAGES["/agadir-taxi"].title },
      { name: "description", content: SERVICE_PAGES["/agadir-taxi"].description },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/agadir-taxi" }],
  }),
  component: () => <SeoLandingPage path="/agadir-taxi" page={SERVICE_PAGES["/agadir-taxi"]} />,
});
