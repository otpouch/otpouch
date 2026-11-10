import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      inspectorPort: false,
      config: {
        name: "otpouch-site-local",
        main: "./worker/index.ts",
        compatibility_date: "2026-05-15",
        compatibility_flags: ["nodejs_compat"],
      },
    }),
  ],
});
