import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	server: {
		port: 3001,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // `@` will point to the `src` folder
		},
	},
});
