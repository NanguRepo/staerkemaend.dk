<script lang="ts">
  import { head } from "../components/stores";
  import ImageView from "../components/ImageView.svelte";
  import { getImages } from "../components/functions";
  import type { image } from "../components/types";

  $head = "/hjem";
  const images: Promise<image[]> = getImages();
</script>

{#await images}
  <div class="flex h-full w-full items-center justify-center">
    <p>Loading...</p>
  </div>
{:then images}
  <ImageView {images} />
{/await}
