import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
    base: '/blog-threejs/',
    build: {
        outDir: 'docs'
    }
}) satisfies UserConfig