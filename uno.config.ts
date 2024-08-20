// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons/browser";
import mdi from "./src/assets/icons/mdi.json";

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
  ],
  safelist: mdi,
  rules: [
    [/^m-(\d+)$/, ([, d]: any) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, (match: any) => ({ padding: `${match[1] / 4}rem` })],
  ],
});
