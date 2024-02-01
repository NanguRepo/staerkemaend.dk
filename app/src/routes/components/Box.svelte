<script lang="ts">
  export let title: string = "Title";
</script>

<div class="flex flex-col p-2">
  <h2
    class="flex justify-center rounded-t bg-black px-4 text-xl font-bold text-white dark:bg-neutral-300 dark:text-black"
  >
    {title}
  </h2>
  <div class="rounded-b border-2 border-black p-1 dark:border-neutral-300">
    <slot>
      <p>Content</p>
    </slot>
  </div>
</div>
