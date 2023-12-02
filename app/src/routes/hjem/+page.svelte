<script lang="ts">
  import { head } from "../components/stores";
  import ImageView from "../components/ImageView.svelte";
  import TagSearcher from "../components/TagSearcher.svelte";
  import { getImages } from "../components/functions";
  import { page } from "$app/stores";
  import type { image } from "../components/types";

  $head = "/hjem";
  const cache = $page.url.searchParams.get("cache") == "true";
  const images: Promise<image[]> = getImages(cache);
</script>

<div class="flex flex-row gap-4 p-4">
  <div class="w-3/4">
    {#await images}
      <div class="flex h-full w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    {:then images}
      <ImageView {images} />
    {/await}
  </div>
  <div class="sticky top-0 w-1/4">
    <TagSearcher />
  </div>
</div>
