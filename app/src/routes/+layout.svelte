<script lang="ts">
  import "../app.css";
  import Navbar from "./components/navbar.svelte";
  import Footer from "./components/footer.svelte";
</script>

<div
  class="flex h-full min-h-screen w-full flex-col gap-4 dark:bg-neutral-900 dark:text-white"
>
  <Navbar />
  <slot />
  <Footer />
</div>
