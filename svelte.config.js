import adapter from '@sveltejs/adapter-vercel'
import { resolve } from 'path'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $components: resolve('./src/lib/components'),
      $lib: resolve('./src/lib'),
      $utils: resolve('./src/lib/utils'),
    },
  },
}

export default config
