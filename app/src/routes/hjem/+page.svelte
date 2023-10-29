<script lang="ts">
  import images from "../../resources/mænd.json";
  import { createColumns } from "../components/functions";
  import { head } from "../components/stores";

  $head = "/hjem";
  const columns = createColumns(images);
</script>

<div class="flex h-full w-full flex-row gap-4 p-4">
  <div class="flex h-full w-1/2 flex-col gap-4">
    {#each columns.left as image}
      {#if image}
        <img
          src={image.src}
          alt="stærk mand"
          class="h-[50vh] w-full rounded-xl"
        />
      {/if}
    {/each}
  </div>
  <div class="flex h-full w-1/2 flex-col gap-4">
    {#each columns.right as image}
      {#if image}
        <img
          src={image.src}
          alt="stærk mand"
          class="h-[50vh] w-full rounded-xl"
        />
      {/if}
    {/each}
  </div>
</div>
