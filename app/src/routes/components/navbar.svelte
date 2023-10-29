<script lang="ts">
  import { head } from "./stores";
  const links = ["/hjem", "/om", "/søg"];
</script>

<nav class="flex flex-row justify-between gap-4 p-4">
  <div class="flex flex-row gap-4">
    {#each links as link}
      {#if link == $head}
        <p class="font-bold">{link.replace("/", "")}</p>
      {:else}
        <a href={link} class="hover:underline">{link.replace("/", "")}</a>
      {/if}
    {/each}
  </div>
  <a href="/hjem">stærke mænd</a>
</nav>
