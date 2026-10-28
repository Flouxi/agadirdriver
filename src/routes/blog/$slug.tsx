import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { BLOG_POSTS, BUSINESS } from "../../data/seo";
import { seoHead, jsonLd } from "../../lib/seo-head";
import RouteFareTable from "../../components/RouteFareTable";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BookingFaqs from "../../components/BookingFaqs";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!BLOG_POSTS.some((post) => post.path === "/blog/" + params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const post = BLOG_POSTS.find((item) => item.path === "/blog/" + params.slug);
    return post
      ? seoHead({
          title: post.title + " | Agadir Driver",
          description: post.description,
          path: post.path,
          type: "article",
        })
      : {
          meta: [
            { title: "Guide not found | Agadir Driver" },
            { name: "robots", content: "noindex" },
          ],
        };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = Route.useParams();
  const post = BLOG_POSTS.find((item) => item.path.endsWith(slug));
  if (!post)
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-24">
        <h1 className="text-4xl font-bold">Guide not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-accent">
          Back to the Journal
        </Link>
      </main>
    );
  return (
    <div className="ad-site">
      <Header />
      <main className="min-h-screen bg-surface text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": BUSINESS.url + post.path + "#article",
              url: BUSINESS.url + post.path,
              headline: post.title,
              description: post.description,
              mainEntityOfPage: BUSINESS.url + post.path,
              author: { "@type": "Organization", name: "Agadir Driver", url: BUSINESS.url },
              publisher: { "@id": BUSINESS.url + "/#business" },
            }),
          }}
        />
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
          <Link to="/blog" className="text-sm text-ink/55 hover:text-accent">
            ← Agadir Travel Journal
          </Link>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {post.category}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-ink/65">{post.description}</p>
          <div className="mt-12 space-y-12">
            {post.sections.map(([heading, body]) => (
              <section key={heading}>
                <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>
                <p className="mt-4 text-lg leading-8 text-ink/70">{body}</p>
              </section>
            ))}
          </div>
          {post.path.includes("prices-and-booking") && <RouteFareTable />}
          <nav className="ad-guide-related" aria-label="Related transfer services">
            <h2>Plan the next step</h2>
            <Link to="/agadir-airport-transfer">Compare Agadir airport transfers</Link>
            <Link to="/airport-transfer-taghazout">Agadir Airport to Taghazout</Link>
            <Link to="/airport-transfer-tamraght">Agadir Airport to Tamraght</Link>
          </nav>
          <div className="mt-16 rounded-3xl bg-ink p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Need transport in Agadir?
            </p>
            <h2 className="mt-3 text-2xl font-bold">Ask AgadirDriver about your route.</h2>
            <p className="mt-3 text-white/65">
              Send your flight, accommodation, and passenger details for booking guidance.
            </p>
            <a
              href={`${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi AgadirDriver.com, I would like to ask about a journey in Agadir.")}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink"
            >
              <MessageCircle size={17} /> WhatsApp {BUSINESS.phone}
            </a>
          </div>
        </article>
        <BookingFaqs />
      </main>
      <Footer />
    </div>
  );
}
