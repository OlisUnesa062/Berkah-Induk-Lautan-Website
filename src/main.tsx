import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { langFromPath } from './i18n'
import './index.css'

const root = document.getElementById('root')!
const lang = langFromPath(window.location.pathname)
const app = (
  <React.StrictMode>
    <App initialLang={lang} />
  </React.StrictMode>
)

// Hasil build sudah berisi HTML prerender → cukup di-hydrate. Saat dev, root masih kosong.
// Kalau server menyajikan HTML bahasa lain dari URL, render ulang saja daripada hydrate yang tidak cocok.
if (root.firstElementChild && document.documentElement.lang === lang) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
