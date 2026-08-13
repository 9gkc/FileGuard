import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", include: ["src/core/**/*.test.mjs"], coverage: { reporter: ["text", "html"] } },
});
