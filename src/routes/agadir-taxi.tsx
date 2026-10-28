import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";
import { seoHead } from "../lib/seo-head";

export const Route = createFileRoute("/agadir-taxi")({
  head: () =>
    seoHead({
      title: SERVICE_PAGES["/agadir-taxi"].title,
      description: SERVICE_PAGES["/agadir-taxi"].description,
      path: "/agadir-taxi",
    }),
  component: () => <SeoLandingPage path="/agadir-taxi" page={SERVICE_PAGES["/agadir-taxi"]} />,
});
