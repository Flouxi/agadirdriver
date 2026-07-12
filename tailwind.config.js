module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { fontFamily: { sans: ['var(--font-inter)','system-ui','sans-serif'], serif: ['var(--font-playfair)','Georgia','serif'] }, colors: { primary:'#1a365d','primary-light':'#2a4a7f',secondary:'#c9a84c','secondary-light':'#d4b85a',accent:'#e53e3e' } } },
  plugins: [],
}
