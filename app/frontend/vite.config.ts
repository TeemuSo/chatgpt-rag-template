import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/static/",
    plugins: [react({})],
    build: {
        outDir: "../backend/static",
        emptyOutDir: true,
        sourcemap: true
    },
    server: {
        port: 5173,
        host: "0.0.0.0",
        proxy: {
            "/ask": "http://localhost:8000",
            "/chat": "http://localhost:8000"
        }
    }
});
