import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3001",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            "/docs": {
                target: "http://localhost:3001",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            "/web": {
                target: "http://localhost:3001",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            "/build": {
                target: "http://localhost:3001",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            "/login": {
                target: "http://localhost:3001",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
    plugins: [react()],
    build: {
        outDir: "../App/wwwroot",
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "esnext",
        },
    },
});
