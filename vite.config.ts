import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const isProfiling = mode === "profiling";

    return {
        plugins: [react()],
        resolve: {
            alias: isProfiling
                ? [
                      { find: /^react-dom$/, replacement: "react-dom/profiling" },
                      {
                          find: "scheduler/tracing",
                          replacement: "scheduler/tracing-profiling",
                      },
                  ]
                : undefined,
        },
        server: {
            port: 5173,
        },
    };
});
