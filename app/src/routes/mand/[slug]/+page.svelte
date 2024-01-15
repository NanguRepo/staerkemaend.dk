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

<div class="flex w-full flex-row gap-2 px-2">
  {#await getImage(data.id)}
    <div class="flex h-full w-full justify-center">
      <p class="text-neutral-500">Loading...</p>
    </div>
  {:then image}
    <div class="flex h-fit w-fit flex-col gap-2 rounded bg-neutral-100 p-4">
      <ul>
        {#each image.tags as tag}
          <li>
            <a href="/?tags={tag}" class="hover:underline">{tag}</a>
          </li>
        {/each}
      </ul>
    </div>
    <a href={$previous}>
      <img src={image.src} alt="stærk mand" class="rounded" />
    </a>
  {:catch error}
    <p class="flex h-full w-full items-center justify-center text-neutral-500">
      {error.response.data.error}
    </p>
  {/await}
</div>
