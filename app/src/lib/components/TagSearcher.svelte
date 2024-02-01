<script lang="ts">
  import { getTags } from "./functions";
  import type { tag } from "./types";
  import { selectedTags } from "./stores";
  import { onMount } from "svelte";
  let hovered: string | null = null;

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("tags")) {
      const queriedTags: string[] | undefined = urlParams
        .get("tags")
        ?.split(",");
      const availableTags: tag[] = await getTags();
      const validTags: tag[] = availableTags.filter((item) => {
        return queriedTags?.includes(item.name);
      });
      $selectedTags = validTags;
    }
  });

  $: inputValue = "";
  const sortByLength = (tags: tag[]): tag[] => {
    return tags.sort((a, b) => {
      return a.name.length - b.name.length;
    });
  };
  const sortByCount = (tags: tag[]): tag[] => {
    return tags.sort((a, b) => {
      return b.count - a.count;
    });
  };
</script>

<div
  class="flex h-auto w-full flex-col gap-1 rounded border border-neutral-300 bg-neutral-100 p-4 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
>
  <h1 class="text-xl font-bold">Søgning ved tags</h1>
  <label for="taginput">Søg på tags</label>
  <input
    class="rounded border border-neutral-200 px-4 py-2 dark:border-neutral-300 dark:bg-black dark:text-white"
    name="taginput"
    bind:value={inputValue}
  />
  <div
    class="max-h-1/3 flex flex-wrap gap-1 overflow-scroll rounded border border-neutral-300 bg-neutral-200 p-1 dark:border-neutral-400 dark:bg-neutral-900"
  >
    {#await getTags()}
      <p>Loading...</p>
    {:then tags}
      {#if tags.length == $selectedTags.length}
        <p class="p-2 text-neutral-600 dark:text-neutral-400">
          Du har valgt alle tags!
        </p>
      {/if}
      {#each sortByCount(tags) as tag}
        {#if (tag.name.includes(inputValue) || !inputValue) && !$selectedTags.includes(tag)}
          <button
            class="flex h-fit w-auto items-center gap-1 rounded-xl border border-neutral-300 bg-white pr-2 hover:border-neutral-600 dark:border-neutral-500 dark:bg-black dark:text-white dark:hover:border-neutral-300"
            on:mouseenter={() => {
              hovered = tag.name;
            }}
            on:mouseleave={() => {
              hovered = null;
            }}
            on:click={() => {
              $selectedTags = [...$selectedTags, tag];
            }}
          >
            <p
              class="-ml-[1px] flex h-full w-6 flex-row items-center justify-center rounded-l-xl bg-black pl-1 font-mono text-white dark:bg-white dark:text-black"
            >
              {hovered == tag.name ? "+" : tag.count}
            </p>
            <p>{tag.name}</p>
          </button>
        {/if}
      {/each}
    {/await}
  </div>
  <p>Tags i din søgning:</p>
  <div
    class="flex flex-wrap gap-1 rounded border border-neutral-300 bg-neutral-200 p-1 dark:border-neutral-400 dark:bg-neutral-900"
  >
    {#if $selectedTags.length}
      {#each sortByLength($selectedTags) as tag}
        <button
          class="flex h-fit w-auto items-center gap-1 rounded-xl border border-neutral-300 bg-white pr-2 hover:border-neutral-600 dark:border-neutral-500 dark:bg-black dark:text-white dark:hover:border-neutral-300"
          on:mouseenter={() => {
            hovered = tag.name;
          }}
          on:mouseleave={() => {
            hovered = null;
          }}
          on:click={() => {
            $selectedTags = $selectedTags.filter((item) => {
              return item !== tag;
            });
          }}
        >
          <p
            class="-ml-[1px] flex h-full w-6 flex-row items-center justify-center rounded-l-xl bg-black pl-1 font-mono text-white dark:bg-white dark:text-black"
          >
            {hovered == tag.name ? "-" : tag.count}
          </p>
          <p>{tag.name}</p>
        </button>
      {/each}
    {:else}
      <p class="p-2 text-neutral-600 dark:text-neutral-400">
        Vælg nogle tags ved at klikke på dem ovenfor.
      </p>
    {/if}
  </div>
</div>
