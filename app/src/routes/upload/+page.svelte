<script lang="ts">
  import { goto } from "$app/navigation";
  import axios from "axios";
  import { head } from "../components/stores";
  $head = "/upload";

  let files: any;
  let errorText: string;
  let tagValue: string;
  interface imageObject {
    password: string;
    src: string;
    tags: string[];
  }
  let image: imageObject = {
    password: "",
    src: "",
    tags: [],
  };
  $: if (files) {
    axios
      .postForm("https://api.pege.io/v2/upload", { file: files[0] })
      .then((response) => {
        image.src = response.request.responseURL;
      })
      .catch((error) => {
        errorText = error.response.data.error;
      });
  }
  $: if (tagValue) {
    if (tagValue.includes(",") && tagValue.replace(/,/g, "") != "") {
      image.tags = [...image.tags, tagValue.replace(/,/g, "")];
      tagValue = "";
    }
  }
  const post = () => {
    axios
      .post("https://api.pege.io/v2/staerkemaend/addImage", image)
      .then((response) => {
        goto(`/mand/${response.data.id}`);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
</script>

<div class="flex h-full w-full items-center justify-center">
  <div
    class="flex h-fit w-min flex-col gap-2 rounded bg-neutral-100 p-4 shadow dark:bg-neutral-800"
  >
    <div class="g-2 flex flex-row items-center justify-between">
      <p class="text-xl font-bold">Nyt billede</p>
      <button
        disabled={!(
          image.password != "" &&
          image.tags.length > 0 &&
          image.src != ""
        )}
        on:click={post}
        class="rounded border border-neutral-200 bg-green-400 px-2 py-1 text-white enabled:hover:border-neutral-300 enabled:hover:bg-green-500 enabled:active:bg-green-600 disabled:bg-neutral-300 disabled:text-neutral-500"
        >Post</button
      >
    </div>
    <div
      class="flex aspect-square w-64 select-none items-center justify-center rounded border border-neutral-300 dark:border-neutral-600"
    >
      {#if image.src}
        <img
          src={image.src}
          alt={image.src}
          class="aspect-square w-64 rounded"
        />
      {:else if errorText}
        <p class="text-red-400">{errorText}</p>
      {:else}
        <p class="text-neutral-400">Dit billede her</p>
      {/if}
    </div>
    <div class="flex w-full flex-row gap-2">
      <label
        class="rounded border border-neutral-300 bg-neutral-200 px-2 py-1 hover:border-neutral-400 hover:bg-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
      >
        <input type="file" bind:files accept="image/*" class="hidden" />
        <p>📂</p>
      </label>
      <input
        type="url"
        class="w-full rounded border bg-neutral-200 px-2 py-1 dark:border-neutral-600 dark:bg-neutral-700"
        bind:value={image.src}
        placeholder="Billedlink..."
      />
    </div>
    <input
      type="password"
      class="w-full rounded border bg-neutral-200 px-2 py-1 dark:border-neutral-600 dark:bg-neutral-700"
      placeholder="Password..."
      bind:value={image.password}
    />
    <input
      type="text"
      class="w-full rounded border bg-neutral-200 px-2 py-1 dark:border-neutral-600 dark:bg-neutral-700"
      placeholder="Tilføj tags... (kommasepareret)"
      bind:value={tagValue}
    />
    <div class="flex flex-wrap gap-1 rounded p-2">
      {#if image.tags.length != 0}
        {#each image.tags as tag}
          <button
            on:click={() => {
              image.tags = image.tags.filter((item) => {
                return item != tag;
              });
            }}
            class="flex h-fit w-auto items-center gap-1 rounded-lg border border-neutral-300 bg-white px-2 py-1 hover:border-neutral-600 dark:border-neutral-500 dark:bg-black dark:text-white dark:hover:border-neutral-300"
            >{tag}</button
          >
        {/each}
      {:else}
        <p
          class="flex h-fit w-full select-none justify-center gap-1 rounded-lg border px-2 py-1 text-neutral-400 dark:border-neutral-700"
        >
          Tilføjede tags viser sig her
        </p>
      {/if}
    </div>
  </div>
</div>
