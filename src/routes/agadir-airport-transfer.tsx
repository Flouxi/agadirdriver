import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";
import { seoHead } from "../lib/seo-head";

export const Route = createFileRoute("/agadir-airport-transfer")({
  head: () =>
    seoHead({
      title: SERVICE_PAGES["/agadir-airport-transfer"].title,
      description: SERVICE_PAGES["/agadir-airport-transfer"].description,
      path: "/agadir-airport-transfer",
    }),
  component: () => (
    <SeoLandingPage
      path="/agadir-airport-transfer"
      page={SERVICE_PAGES["/agadir-airport-transfer"]}
    />
  ),
});
