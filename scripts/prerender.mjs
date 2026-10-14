// Langkah terakhir `pnpm build`: membuat HTML statis per bahasa + sitemap.xml + robots.txt.
//   dist/index.html     → Bahasa Indonesia (/)
//   dist/en/index.html  → English (/en)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, seoHeadTags, SITE_URL, LANGS, LANG_PATH } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

for (const lang of LANGS) {
  // Pakai fungsi pengganti agar karakter "$" di konten tidak dianggap pola replace.
  const html = template
    .replace(/<html lang="[^"]*"/, () => `<html lang="${lang}"`)
    .replace('<!--seo-head-->', () => seoHeadTags(lang))
    .replace('<!--app-html-->', () => render(lang))
  const out = path.join(dist, LANG_PATH[lang], 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log(`prerender: ${LANG_PATH[lang]} (${lang}) → ${path.relative(root, out)}`)
}

const robots = ['User-agent: *', 'Allow: /']
if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10)
  const alternates = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${LANG_PATH[l]}" />`,
  )
  alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${LANG_PATH[LANGS[0]]}" />`)
  const urls = LANGS.map((lang) =>
    [
      '  <url>',
      `    <loc>${SITE_URL}${LANG_PATH[lang]}</loc>`,
      ...alternates,
      `    <lastmod>${today}</lastmod>`,
      '  </url>',
    ].join('\n'),
  )
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
  )
  robots.push('', `Sitemap: ${SITE_URL}/sitemap.xml`)
  console.log(`prerender: sitemap.xml untuk ${SITE_URL}`)
} else {
  console.warn('prerender: SITE_URL belum diatur, sitemap.xml dilewati (canonical & hreflang memakai path relatif).')
}
fs.writeFileSync(path.join(dist, 'robots.txt'), robots.join('\n') + '\n')

fs.rmSync(ssrDir, { recursive: true, force: true })
