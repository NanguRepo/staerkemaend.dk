<script lang="ts">
  import type { PageData } from "./$types";
  import { getImage } from "../../components/functions";
  import Box from "../../components/Box.svelte";
  import { head, previous } from "../../components/stores";
  import { afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";

  export let data: PageData;
  $head = "subpage";
  afterNavigate(({ from }) => {
    $previous = from?.url.pathname || base;
  });
  const getMeta = async (url: string) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  };
</script>

<div class="flex w-full flex-row gap-2 px-2">
  {#await getImage(data.id)}
    <div class="flex h-full w-full justify-center">
      <p class="text-neutral-500">Loading...</p>
    </div>
  {:then image}
    <div
      class="flex h-fit w-fit flex-col gap-2 rounded bg-neutral-100 p-2 dark:bg-neutral-800"
    >
      <Box title="Tags">
        <ul>
          {#each image.tags as tag}
            <li class="flex w-full text-center">
              <a
                href="/hjem/?tags={tag}"
                class="w-full rounded px-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >{tag}</a
              >
            </li>
          {/each}
        </ul>
      </Box>
      <Box title="Info">
        <ul>
          <li class="flex w-full justify-between gap-2">
            <b>Kilde</b>
            <a
              class="text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-500"
              href={image.src}>Klik her</a
            >
          </li>
          <li class="flex w-full justify-between gap-2">
            <b>Opløsning</b>
            {#await getMeta(image.src)}
              henter...
            {:then img}
              {img.width}x{img.height}
            {/await}
          </li>
          <li class="flex w-full justify-between gap-2">
            <b>ID</b>
            {image.id}
          </li>
          <li>
            <b>Uploaded</b>
            {new Date(1000 * image.time).toISOString().split("T")[0]}
          </li>
        </ul>
      </Box>
    </div>
    <a href={$previous} class="w-full">
      <img src={image.src} alt="stærk mand" class="w-full rounded" />
    </a>
  {:catch error}
    <p class="flex h-full w-full items-center justify-center text-neutral-500">
      {error.response.data.error}
    </p>
  {/await}
</div>
