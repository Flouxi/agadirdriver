import { useState } from 'react';
import { Globe, User, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { AGADIR_DRIVER_LOGO_URL } from '../lib/brand-images';
import { LANGUAGE_OPTIONS, useI18n } from '../lib/i18n';

interface HeaderProps {
  onNavClick?: (section: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { lang: currentLang, setLang: setCurrentLang, t } = useI18n();
  const whatsappLink = 'https://wa.me/2120606419700?text=Bonjour%20Agadir%20Driver%2C%20j%27ai%20besoin%20d%27aide%20pour%20mon%20transport.';

  const navItems = [
    { label: t('nav.airport'), id: 'airport' },
    { label: t('nav.intercity'), id: 'intercity' },
    { label: t('nav.hourly'), id: 'hourly' },
    { label: t('nav.help'), id: 'help' },
    { label: t('nav.business'), id: 'business' }
  ];

  const languageOptions = LANGUAGE_OPTIONS;

  const handleItemClick = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
    }
    setMobileMenuOpen(false);
  };

  const langMenu = (
    <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-ink-soft py-1 text-sm text-white/80 shadow-float z-[60]">
      {languageOptions.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            setCurrentLang(lang.code);
            setLangDropdownOpen(false);
          }}
          className="block w-full px-4 py-2 text-left text-[13px] hover:bg-white/10 hover:text-white"
        >
          {lang.label}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-[9999] w-full isolate bg-ink text-white">
      {/* Utility bar — muted, single line, no visual noise */}
      <div className="hidden border-b border-white/8 sm:block">
        <div className="shell flex items-center justify-between py-2 text-[12px] text-white/55">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t('top.support')}
            </span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone size={12} className="text-accent" />
              +212 060 641 9700
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer transition-colors hover:text-white">{t('top.driver')}</span>
            <span className="cursor-pointer transition-colors hover:text-white">{t('top.agency')}</span>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="flex h-16 items-center gap-6 sm:h-[72px]">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleItemClick('hero')}
            className="flex shrink-0 items-center cursor-pointer"
            aria-label="Agadir Driver — accueil"
          >
            <img
              src={AGADIR_DRIVER_LOGO_URL}
              alt="Agadir Driver"
              className="h-11 w-auto max-w-[200px] object-contain sm:h-[72px] sm:max-w-[280px]"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden min-w-0 items-center gap-7 text-[14px] font-medium text-white/75 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="group relative cursor-pointer py-2 whitespace-nowrap transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Language (desktop) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setMobileMenuOpen(false);
                  setUserDropdownOpen(false);
                }}
                className="flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                aria-label={t('header.langAria')}
              >
                <Globe size={16} strokeWidth={1.75} />
                <span>{currentLang}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.75}
                  className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langDropdownOpen && langMenu}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setLangDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/20 text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
                aria-label={t('header.login')}
                aria-expanded={userDropdownOpen}
              >
                <User size={20} strokeWidth={1.75} />
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-ink-soft py-2 text-sm text-white/80 shadow-float z-[60]">
                  <button className="block w-full px-4 py-2.5 text-left text-[13px] font-medium hover:bg-white/10 hover:text-white">
                    {t('header.login')}
                  </button>
                  <button className="block w-full px-4 py-2.5 text-left text-[13px] font-medium hover:bg-white/10 hover:text-white">
                    {t('header.signup')}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangDropdownOpen(false);
                setUserDropdownOpen(false);
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/20 text-white/85 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-white/10 bg-ink shadow-float lg:hidden">
          <div className="shell space-y-1 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="block w-full cursor-pointer rounded-xl px-3 py-3 text-left text-[15px] font-medium text-white/85 transition-colors hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-3 space-y-3 border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      currentLang === lang.code
                        ? 'border-accent bg-accent/15 text-white'
                        : 'border-white/15 text-white/65'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-1 text-[12px] text-white/50">
                <span className="cursor-pointer hover:text-white">{t('top.driverShort')}</span>
                <span className="cursor-pointer hover:text-white">{t('top.agency')}</span>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-1 text-[12px] text-white/50 hover:text-white"
              >
                <Phone size={12} className="text-accent" />
                {t('top.support')} · +212 060 641 9700
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
