import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

let spaFallbackOutDir = path.resolve(__dirname, 'dist')

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
