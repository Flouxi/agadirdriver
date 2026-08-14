import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { BLOG_POSTS } from "../../data/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Agadir Travel Journal | Airport Transfers and Local Guides" },
      { name: "description", content: "Practical Agadir travel guides covering airport transfers, taxis, Taghazout, Tamraght, and private drivers." },
    ],
    links: [{ rel: "canonical", href: "https://agadirdriver.com/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return <main className="min-h-screen bg-surface text-ink"><section className="bg-ink px-5 py-20 text-white sm:px-8 lg:py-28"><div className="mx-auto max-w-5xl"><Link to="/" className="text-sm text-white/60 hover:text-white">← Back to AgadirDriver.com</Link><p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent">AgadirDriver.com · Travel Journal</p><h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">Plan your Agadir journey with confidence.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">Practical guides for airport transfers, local taxis, Taghazout, Tamraght, and private travel around Agadir.</p></div></section><section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24"><div className="grid gap-6 md:grid-cols-3">{BLOG_POSTS.map((post) => <article key={post.path} className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-accent"><span>{post.category}</span><span className="flex items-center gap-1 text-ink/45"><Clock3 size={13} /> 4 min</span></div><h2 className="mt-6 text-2xl font-bold leading-tight">{post.title}</h2><p className="mt-4 flex-1 text-sm leading-7 text-ink/65">{post.description}</p><Link to={post.path as any} className="mt-7 inline-flex items-center gap-2 font-semibold text-ink hover:text-accent">Read guide <ArrowRight size={16} /></Link></article>)}</div></section></main>;
}
