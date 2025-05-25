import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  base: "https://rishab1493.github.io/jsontocsv/",
  plugins: [react()],
})
