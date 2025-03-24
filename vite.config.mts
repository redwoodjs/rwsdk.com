import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import { redwood } from "@redwoodjs/sdk/vite";

export default defineConfig({
  plugins: [tailwindcss(), redwood()],
});
