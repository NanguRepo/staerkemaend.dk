<script lang="ts">
  import { head, selectedTags } from "$lib/components/stores";
  import ImageView from "$lib/components/ImageView.svelte";
  import TagSearcher from "$lib/components/TagSearcher.svelte";
  import { getImages, searchImage } from "$lib/components/functions";

  $head = "/hjem";
</script>

<div class="flex flex-row gap-4 p-4">
  <div class="w-3/4">
    {#if !$selectedTags.length}
      {#await getImages()}
        <div class="flex h-full w-full items-center justify-center">
          <p class="text-neutral-500">Loading...</p>
        </div>
      {:then images}
        <ImageView {images} />
      {/await}
    {:else}
      {#await searchImage($selectedTags)}
        <div class="flex h-full w-full items-center justify-center">
          <p class="text-neutral-500">Loading...</p>
        </div>
      {:then images}
        <ImageView {images} />
      {/await}
    {/if}
  </div>
  <div class="sticky top-0 h-fit w-1/4">
    <TagSearcher />
  </div>
</div>
