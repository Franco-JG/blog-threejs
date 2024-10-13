import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
    server: {
        host: true,
    },
    base: '/blog-threejs/',
    build: {
        outDir: 'docs'
    }
}) satisfies UserConfig