<script lang="ts">
    import "../app.postcss";
    import Navigation from "$lib/components/Navigation.svelte";
    import {theme} from "$lib/stores/theme";
    import TailwindColors from "$lib/components/TailwindColors.svelte";
    import {editor} from "$lib/stores/editor";
    import StoreSettingsCog from "$lib/components/store-settings/StoreSettingsCog.svelte";
    import AgeAuthorization from "$lib/components/modules/AgeAuthorization.svelte";

    export let data;

    if (data["theme"]) {
        $theme = data["theme"];
    }

    $editor.enabled = data["editor"] !== null;
</script>

<main>
    <Navigation/>
    <section>
        <slot/>
    </section>
</main>

<AgeAuthorization />

{#if $editor.enabled}
    <StoreSettingsCog />
{/if}

<!--Used to load tailwind colors-->

<TailwindColors/>

<style lang="scss">
  main {
    @apply flex flex-col w-screen h-screen bg-red-500;
  }
</style>