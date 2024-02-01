import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import adapter from '@sveltejs/adapter-vercel';
import Icons from "unplugin-icons/vite";

export default defineConfig({
  kit: {
		adapter: adapter({
			// see below for options that can be set here
		})
	}
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
  ],
});
