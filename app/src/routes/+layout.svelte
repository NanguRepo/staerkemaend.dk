<script lang="ts">
  import "../app.css";
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<div
  class="flex h-full min-h-screen w-full flex-col justify-between gap-4 dark:bg-neutral-900 dark:text-white"
>
  <Navbar />
  <slot />
  <Footer />
</div>
