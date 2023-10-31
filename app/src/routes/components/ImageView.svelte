<script lang="ts">
  import type { image } from "./types";
  import { createColumns } from "../components/functions";
  import Image from "./Image.svelte";
  export let images: image[];
  const columns = createColumns(images);
</script>

<div class="flex h-full w-full flex-row gap-4 p-4">
  <div class="flex h-full w-1/2 flex-col gap-4">
    {#each columns.left as image, i}
      {#if image}
        <div class="aspect-square w-full">
          <Image {image} tabindex={i} />
        </div>
      {/if}
    {/each}
  </div>
  <div class="flex h-full w-1/2 flex-col gap-4">
    {#each columns.right as image, i}
      {#if image}
        <div class="aspect-square w-full">
          <Image {image} tabindex={i + columns.left.length} />
        </div>
      {/if}
    {/each}
  </div>
</div>
