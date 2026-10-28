import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";
import { seoHead } from "../lib/seo-head";

export const Route = createFileRoute("/private-driver-agadir")({
  head: () =>
    seoHead({
      title: SERVICE_PAGES["/private-driver-agadir"].title,
      description: SERVICE_PAGES["/private-driver-agadir"].description,
      path: "/private-driver-agadir",
    }),
  component: () => (
    <SeoLandingPage path="/private-driver-agadir" page={SERVICE_PAGES["/private-driver-agadir"]} />
  ),
});
