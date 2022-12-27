<script lang="ts">
    import "../app.postcss";
    import Navigation from "$lib/components/modules/Navigation/Navigation.svelte";
    import {theme} from "$lib/stores/theme";
    import TailwindColors from "$lib/components/TailwindColors.svelte";
    import {editor} from "$lib/stores/editor";
    import StoreSettingsCog from "$lib/components/store-settings/StoreSettingsCog.svelte";
    import AgeAuthorization from "$lib/components/modules/AgeAuthorization/AgeAuthorization.svelte";
    import {store} from "$lib/stores/store";

    export let data;
    let is18 = data["cookies"]["is18"];

    if (data["theme"]) {
        $theme = data["theme"];

        if (data["theme"]["store"]) {
            $store = data["theme"]["store"];
        }
    }

    theme.subscribe((conf) => {
        $store = conf["store"] || {};
    })

    $editor.enabled = data["editor"] !== null;
</script>

<main>
    <Navigation/>
    <section>
        <slot/>
    </section>
</main>

{#if !is18}
    <AgeAuthorization/>
{/if}

{#if $editor.enabled}
    <StoreSettingsCog/>
{/if}

<!--Used to load tailwind colors-->

<TailwindColors/>

<style lang="scss">
  main {
    @apply flex flex-col w-screen h-screen;
  }
</style>