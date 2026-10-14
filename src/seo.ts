import { DEFAULT_LANG, LANGS, LANG_PATH, SERVICE_TITLES, translations, type Lang } from "./i18n";

/** Domain produksi, diisi saat build (lihat vite.config.ts). Kosong = belum diketahui. */
export const SITE_URL: string = __SITE_URL__;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Tag <head> untuk SEO satu bahasa: title, description, canonical, hreflang, Open Graph, JSON-LD.
 * Setiap tag diberi atribut `data-seo` supaya bisa diganti saat bahasa berubah.
 */
export function seoHeadTags(lang: Lang, origin: string = SITE_URL): string {
  const t = translations[lang];
  const url = (l: Lang) => origin + LANG_PATH[l];
  const logo = `${origin}/images/bil-logo.png`;
  const orgId = `${origin}/#organization`;
  const siteId = `${origin}/#website`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "PT Berkah Induk Lautan",
        alternateName: ["Berkah Induk Lautan", "BIL"],
        url: url(DEFAULT_LANG),
        logo,
        description: t.seo.description,
        address: { "@type": "PostalAddress", addressCountry: "ID" },
        areaServed: "Worldwide",
        knowsAbout: t.seo.keywords,
        makesOffer: SERVICE_TITLES.map((name, index) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            description: t.services.items[index].detail,
            provider: { "@id": orgId },
            areaServed: "Worldwide",
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: url(DEFAULT_LANG),
        name: "Berkah Induk Lautan",
        inLanguage: LANGS.map((l) => translations[l].seo.inLanguage),
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        url: url(lang),
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: t.seo.inLanguage,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
      },
    ],
  };

  const tags = [
    `<title>${esc(t.seo.title)}</title>`,
    `<meta name="description" content="${esc(t.seo.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${esc(url(lang))}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${esc(url(l))}" />`),
    `<link rel="alternate" hreflang="x-default" href="${esc(url(DEFAULT_LANG))}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Berkah Induk Lautan" />`,
    `<meta property="og:title" content="${esc(t.seo.title)}" />`,
    `<meta property="og:description" content="${esc(t.seo.description)}" />`,
    `<meta property="og:url" content="${esc(url(lang))}" />`,
    `<meta property="og:image" content="${esc(logo)}" />`,
    `<meta property="og:locale" content="${t.seo.ogLocale}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${translations[l].seo.ogLocale}" />`),
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(t.seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.seo.description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];

  return tags.map((tag) => tag.replace(/^<(\w+)/, "<$1 data-seo")).join("\n    ");
}

/** Dipanggil di browser saat bahasa berganti: perbarui <html lang> dan seluruh tag SEO. */
export function applySeo(lang: Lang) {
  document.documentElement.lang = lang;
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
  document.head.insertAdjacentHTML("beforeend", seoHeadTags(lang, SITE_URL || window.location.origin));
}
