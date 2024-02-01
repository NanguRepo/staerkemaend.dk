import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { image, tag } from "./types";

export const head: Writable<string> = writable("");
export const previous: Writable<string> = writable("/");
export const images: Writable<image[]> = writable([]);
export const tags: Writable<tag[]> = writable([]);
export const selectedTags: Writable<tag[]> = writable([]);
