import { createFileRoute, notFound } from "@tanstack/react-router";
import FrenchPage from "../../../components/FrenchPage";
import { frenchPage, type FrenchPath } from "../../../data/french-pages";
import { seoHead } from "../../../lib/seo-head";

export const Route = createFileRoute("/fr/guides/$slug")({
  beforeLoad: ({ params }) => {
    if (!frenchPage("/fr/guides/" + params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const path = "/fr/guides/" + params.slug;
    const page = frenchPage(path);
    return page
      ? seoHead({ title: page.title, description: page.description, path, type: "article" })
      : {
          meta: [
            { title: "Guide introuvable | Agadir Driver" },
            { name: "robots", content: "noindex" },
          ],
        };
  },
  component: () => <FrenchPage path={("/fr/guides/" + Route.useParams().slug) as FrenchPath} />,
});
