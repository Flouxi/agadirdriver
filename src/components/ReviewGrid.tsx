import { REVIEWS } from '../data';
import { Star, BadgeCheck } from 'lucide-react';
import Reveal from './Reveal';

export default function ReviewGrid() {
  return (
    <section className="section-y-sm bg-surface lg:section-y lg:bg-surface-alt">
      <div className="shell">
        <div className="rounded-3xl bg-surface-alt px-5 py-8 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.65rem] font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
            Ce que disent nos clients
          </h2>
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-center shadow-soft sm:px-5 sm:py-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={15} className="fill-trust text-trust" strokeWidth={0} />
              ))}
            </div>
            <span className="text-[13px] font-semibold text-ink sm:text-[14px]">4.9 / 5</span>
            <span className="text-[13px] text-ink/55 sm:text-[14px]">basée sur 38 036 avis sur Trustpilot</span>
          </div>
        </Reveal>

        <div
          className="-mx-5 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {REVIEWS.map((review, i) => (
            <Reveal key={review.id} delay={i * 60} className="w-[80%] shrink-0 snap-start sm:w-auto sm:shrink">
              <figure className="card-lift flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-soft sm:rounded-xl sm:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} size={15} className="fill-trust text-trust" strokeWidth={0} />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[12px] font-medium text-trust">
                        <BadgeCheck size={14} strokeWidth={1.75} />
                        Vérifié
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.01em] text-ink">
                    {review.title}
                  </h3>
                  <blockquote className="mt-2 text-[14px] leading-relaxed text-ink/60">
                    « {review.comment} »
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[13px]">
                  <span className="font-semibold text-ink capitalize">{review.author}</span>
                  <span className="text-ink/45">{review.timeAgo}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-ink/45 sm:mt-10">
          Évaluations client indépendantes collectées via Trustpilot et auditées en toute transparence.
        </p>
        </div>
      </div>
    </section>
  );
}
