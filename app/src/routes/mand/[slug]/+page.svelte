<script lang="ts">
  import type { PageData } from "./$types";
  import { getImage } from "../../components/functions";
  import { head, previous } from "../../components/stores";
  import { afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";

  export let data: PageData;
  $head = "subpage";
  afterNavigate(({ from }) => {
    $previous = from?.url.pathname || base;
  });
</script>

{#await getImage(data.id)}
  <p>Loading...</p>
{:then image}
  <div class="flex flex-col gap-2 p-4">
    <div class="flex h-fit w-fit flex-row gap-4 rounded p-4">
      {#each image.tags as tag}
        <div
          class="w-fit rounded-2xl bg-neutral-100 px-3 py-1 dark:bg-neutral-800"
        >
          <p>{tag}</p>
        </div>
      {/each}
    </div>
    <a href={$previous}>
      <img src={image.src} alt="stærk mand" />
    </a>
  </div>
{:catch error}
  <p class="flex h-full w-full items-center justify-center text-neutral-500">
    {error.response.data.error}
  </p>
{/await}
