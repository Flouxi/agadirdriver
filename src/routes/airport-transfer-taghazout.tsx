import { createFileRoute } from "@tanstack/react-router";
import SeoLandingPage from "../components/SeoLandingPage";
import { SERVICE_PAGES } from "../data/seo";
import { seoHead } from "../lib/seo-head";

export const Route = createFileRoute("/airport-transfer-taghazout")({
  head: () =>
    seoHead({
      title: SERVICE_PAGES["/airport-transfer-taghazout"].title,
      description: SERVICE_PAGES["/airport-transfer-taghazout"].description,
      path: "/airport-transfer-taghazout",
    }),
  component: () => (
    <SeoLandingPage
      path="/airport-transfer-taghazout"
      page={SERVICE_PAGES["/airport-transfer-taghazout"]}
    />
  ),
});
