import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { image } from "./types";

export const head: Writable<string> = writable("");
export const previous: Writable<string> = writable("/");
export const images: Writable<image[]> = writable([]);
export const tags: Writable<Record<string, numbr>> = writable({});
