import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";
import { seoHead } from "../lib/seo-head";

export const Route = createFileRoute("/airport-transfer-tamraght")({
  head: () =>
    seoHead({
      title: SERVICE_PAGES["/airport-transfer-tamraght"].title,
      description: SERVICE_PAGES["/airport-transfer-tamraght"].description,
      path: "/airport-transfer-tamraght",
    }),
  component: () => (
    <SeoLandingPage
      path="/airport-transfer-tamraght"
      page={SERVICE_PAGES["/airport-transfer-tamraght"]}
    />
  ),
});
