<script lang="ts">
  import "../app.postcss";
  import Navigation from "$lib/components/Navigation.svelte";
  import {theme} from "$lib/stores/theme";
  import TailwindColors from "$lib/components/TailwindColors.svelte";
  export let data;

  $: if (data["theme"]) {
      $theme = data["theme"];
  }

  console.log($theme)

</script>

<main>
    <Navigation />
    <section>
        <slot />
    </section>
</main>

<!--Used to load tailwind colors-->

<TailwindColors />

<style lang="scss">
    main {
      @apply flex flex-col w-screen h-screen bg-red-500;
    }
</style>