import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

let spaFallbackOutDir = path.resolve(__dirname, 'dist')

// Per-work SEO metadata. The site is a single-page app, so without this every
// deep-linked piece would share the homepage's title/description and canonical.
// At build time we stamp out one static HTML file per work with its own head,
// so each URL can be indexed and shared on its own. Descriptions are kept to a
// search-friendly ~1 sentence.
const SEO_PIECES: { id: string; title: string; desc: string }[] = [
  { id: 'myrrha', title: 'Myrrha — A Cantata on the Death of Sardanapalus', desc: "Hachem's dramatic cantata on the fall of Nineveh, for soloists, chorus and orchestra, after Byron's Sardanapalus — world premiere in Prague, 2026." },
  { id: 'mephistopheles', title: 'Mephistopheles — A Cantata on the Story of Faust', desc: "Hachem's late-Romantic Faust cantata for soloists, chorus and orchestra, after Goethe — first place in Harmony & Orchestration at the ICS Competition." },
  { id: 'quatuor-no-1', title: 'String Quartet No. 1', desc: "Hachem's single-movement string quartet in broad sonata form (2024), in the line of Ravel and the late Beethoven quartets." },
  { id: 'fantaisie', title: 'Fantaisie for Violin and Piano', desc: "Hachem's free fantasy for violin and piano in two linked sections — a rhapsodic opening and a strict passacaglia (2024)." },
  { id: 'nocturne-flute', title: 'Nocturne for Flute and Piano', desc: "Hachem's Nocturne for flute and piano (2022)." },
  { id: 'quatre-preludes', title: 'Quatre Préludes for Solo Piano', desc: "Hachem's Quatre Préludes for solo piano (2024)." },
  { id: 'trois-melodies', title: 'Trois Mélodies for Mezzo-Soprano and Piano', desc: "Hachem's Trois Mélodies for mezzo-soprano and piano, on French symbolist poetry (2023)." },
]

// Head strings from index.html that get swapped per piece. Kept in one place so
// a change to the homepage head is easy to mirror here.
const HOME_TITLE_TAG = "<title>Hachem — Composer's Record</title>"
const HOME_OGTW_TITLE = 'Hachem — Composer · Pianist · Conductor'
const HOME_DESC =
  'Composer, pianist, and conductor in Paris, studying at the Sorbonne, creating new works from solo piano to orchestra, publishing free Lili Boulanger editions on IMSLP, and accepting commissions.'
// Only the canonical and og:url are per-piece. The Person/WebSite urls in the
// JSON-LD graph must keep pointing at the homepage, so these are matched as
// whole tags rather than by swapping every bare occurrence of the domain.
const HOME_CANONICAL_TAG = '<link rel="canonical" href="https://hachem.cc" />'
const HOME_OG_URL = 'property="og:url"         content="https://hachem.cc"'

function prerenderPieces(outDir: string) {
  const templatePath = path.join(outDir, 'index.html')
  if (!fs.existsSync(templatePath)) return
  const template = fs.readFileSync(templatePath, 'utf8')
  for (const p of SEO_PIECES) {
    const pageTitle = `${p.title} · Hachem`
    const url = `https://hachem.cc/${p.id}`
    const html = template
      .split(HOME_TITLE_TAG)
      .join(`<title>${pageTitle}</title>`)
      .split(`content="${HOME_OGTW_TITLE}"`)
      .join(`content="${pageTitle}"`)
      .split(HOME_DESC)
      .join(p.desc)
      .split(HOME_CANONICAL_TAG)
      .join(`<link rel="canonical" href="${url}" />`)
      .split(HOME_OG_URL)
      .join(`property="og:url"         content="${url}"`)
    // Write the flat file, not just a directory index: GitHub Pages serves
    // /trois-melodies straight from trois-melodies.html, whereas with only
    // trois-melodies/index.html it 301s to the trailing-slash URL — and the
    // no-slash form is what the sitemap, canonical and JSON-LD all advertise.
    // The directory copy stays so the slash form resolves without a redirect
    // for anyone who already has that link.
    fs.writeFileSync(path.join(outDir, `${p.id}.html`), html)
    const dir = path.join(outDir, p.id)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    {
      // GitHub Pages serves 404.html for unknown paths; copying index.html
      // there makes deep links like hachem.cc/myrrha load the app, which
      // then opens the right piece from the pathname.
      name: 'spa-404-fallback',
      configResolved(config: { root: string; build: { outDir: string } }) {
        spaFallbackOutDir = path.resolve(config.root, config.build.outDir)
      },
      closeBundle() {
        const index = path.join(spaFallbackOutDir, 'index.html')
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, path.join(spaFallbackOutDir, '404.html'))
        }
        // Guarantee GitHub Pages serves dotfiles: disable Jekyll and make sure
        // /.well-known is published even if the public-dir copy skips hidden
        // folders (so the Discord domain-verification file is reachable).
        fs.writeFileSync(path.join(spaFallbackOutDir, '.nojekyll'), '')
        const wkSrc = path.resolve(__dirname, 'public/.well-known')
        if (fs.existsSync(wkSrc)) {
          fs.cpSync(wkSrc, path.join(spaFallbackOutDir, '.well-known'), {
            recursive: true,
          })
        }
        // Per-work static pages for SEO. Never let this break the build.
        try {
          prerenderPieces(spaFallbackOutDir)
        } catch (err) {
          console.warn('[prerender] skipped:', err)
        }
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
