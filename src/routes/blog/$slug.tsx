import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { BLOG_POSTS, BUSINESS } from "../../data/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = BLOG_POSTS.find((item) => item.path.endsWith(params.slug));
    return { meta: [{ title: post ? `${post.title} | AgadirDriver.com` : "Agadir Travel Guide | AgadirDriver.com" }, { name: "description", content: post?.description ?? "Agadir travel guides from AgadirDriver.com." }, { property: "og:type", content: "article" }, { property: "og:image", content: "https://agadirdriver.com/assets/agadir88/hero-desktop-v2.jpg" }], links: [{ rel: "canonical", href: `https://agadirdriver.com/blog/${params.slug}` }] };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = Route.useParams();
  const post = BLOG_POSTS.find((item) => item.path.endsWith(slug));
  if (!post) return <main className="mx-auto min-h-screen max-w-3xl px-5 py-24"><h1 className="text-4xl font-bold">Guide not found</h1><Link to="/blog" className="mt-6 inline-block text-accent">Back to the Journal</Link></main>;
  return <main className="min-h-screen bg-surface text-ink"><article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24"><Link to="/blog" className="text-sm text-ink/55 hover:text-accent">← Agadir Travel Journal</Link><p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{post.category}</p><h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">{post.title}</h1><p className="mt-6 text-xl leading-8 text-ink/65">{post.description}</p><div className="mt-12 space-y-12">{post.sections.map(([heading, body]) => <section key={heading}><h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2><p className="mt-4 text-lg leading-8 text-ink/70">{body}</p></section>)}</div><div className="mt-16 rounded-3xl bg-ink p-8 text-white"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Need transport in Agadir?</p><h2 className="mt-3 text-2xl font-bold">Ask AgadirDriver about your route.</h2><p className="mt-3 text-white/65">Send your flight, accommodation, and passenger details for booking guidance.</p><a href={`${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi AgadirDriver.com, I would like to ask about a journey in Agadir.")}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink"><MessageCircle size={17} /> WhatsApp {BUSINESS.phone}</a></div></article></main>;
}
