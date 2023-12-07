<script lang="ts">
  import type { image } from "./types";
  import { createColumns } from "../components/functions";
  import Image from "./Image.svelte";
  export let images: image[];
  const columns = createColumns(images);
</script>

<div class="flex h-full w-full flex-row gap-4">
  {#if !images.length}
    <div class="flex h-full w-full items-center justify-center">
      <p class="text-neutral-500">Ingen billeder fundet.</p>
    </div>
  {:else}
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
  {/if}
</div>
