// Dipakai saat build (scripts/prerender.mjs) untuk menghasilkan HTML statis tiap bahasa,
// supaya mesin pencari langsung membaca isi halaman tanpa harus menjalankan JavaScript.
import { renderToString } from "react-dom/server";
import App from "./App";
import type { Lang } from "./i18n";

export { LANGS, LANG_PATH } from "./i18n";
export { SITE_URL, seoHeadTags } from "./seo";

export function render(lang: Lang) {
  return renderToString(<App initialLang={lang} />);
}
