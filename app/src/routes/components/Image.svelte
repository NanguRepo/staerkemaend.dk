<script lang="ts">
  import type { image } from "./types";
  export let image: image;
  export let tabindex: number;
</script>

<a class="h-full w-full" {tabindex} href="/mand/{image.id}">
  <img
    src={image.src}
    alt={image.tags.join(", ")}
    class="aspect-square h-full w-full rounded object-cover object-top"
  />
</a>
