/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    envPrefix: ["VITE_", "BOOK_STORE_"],
    resolve: {
        alias: {
            "~": "/src",
        },
    },
    test: {
        // We enable globals without telling TypeScript about it. That way,
        // `@testing-library/react` can automatically register cleanup while
        // TypeScript will yell at us if we don't import from `vitest`
        globals: true,
        environment: "jsdom",
    },
});
