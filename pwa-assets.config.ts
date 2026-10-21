import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    // iOS fills transparent pixels with black; give the touch icon a solid tile.
    apple: { ...minimal2023Preset.apple, resizeOptions: { background: '#0a0a0a' } },
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: '#0a0a0a' } },
  },
  images: ['public/logo.svg'],
});
