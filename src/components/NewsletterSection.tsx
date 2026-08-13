import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="section-y-sm bg-surface">
      <div className="shell">
        <div className="rounded-2xl bg-ink px-6 py-14 text-center sm:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-[2.5rem] sm:leading-[1.1]">
              Abonnez-vous à la newsletter et{' '}
              <span className="text-accent">bénéficiez de 5 % de réduction</span> sur votre premier trajet !
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/60">
              Recevez les dernières actualités, conseils de voyage locaux pour le Maroc et offres exclusives directement dans votre boîte de réception.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-3 sm:flex-row"
                >
                  <div className="relative flex w-full items-center">
                    <Mail size={17} strokeWidth={1.75} className="absolute left-4 text-white/40" />
                    <label htmlFor="newsletter-email" className="sr-only">Adresse e-mail</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Saisissez votre adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/8 py-3.5 pr-4 pl-11 text-[15px] font-medium text-white transition-colors placeholder:text-white/40 focus:border-accent focus:outline-none"
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full shrink-0 cursor-pointer rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-foreground transition-all hover:bg-accent-strong active:scale-[0.98] disabled:opacity-50 sm:w-auto"
                  >
                    {loading ? 'Inscription...' : "S'abonner"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/8 p-5"
                >
                  <CheckCircle2 size={20} strokeWidth={1.75} className="shrink-0 text-trust" />
                  <div className="text-left">
                    <span className="block text-[15px] font-semibold text-white">Merci pour votre inscription !</span>
                    <span className="mt-0.5 block text-[13px] text-white/55">Votre code promo de 5% arrive dans quelques instants.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mx-auto mt-8 max-w-lg text-[12px] leading-relaxed text-white/40">
              En vous abonnant à la newsletter, vous acceptez notre politique de confidentialité. Nous ne vendrons ni ne partagerons jamais vos données avec des tiers. Promotion de bienvenue valable uniquement pour les nouveaux clients sur leur premier trajet réservé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
