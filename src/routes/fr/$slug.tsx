import { createFileRoute, notFound } from "@tanstack/react-router";
import FrenchPage from "../../components/FrenchPage";
import { frenchPage, type FrenchPath } from "../../data/french-pages";
import { seoHead } from "../../lib/seo-head";

export const Route = createFileRoute("/fr/$slug")({
  beforeLoad: ({ params }) => {
    if (!frenchPage("/fr/" + params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const path = "/fr/" + params.slug;
    const page = frenchPage(path);
    return page
      ? seoHead({
          title: page.title,
          description: page.description,
          path,
          type: page.kind === "guide" ? "article" : "website",
        })
      : {
          meta: [
            { title: "Page introuvable | Agadir Driver" },
            { name: "robots", content: "noindex" },
          ],
        };
  },
  component: () => <FrenchPage path={("/fr/" + Route.useParams().slug) as FrenchPath} />,
});
