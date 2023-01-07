<script lang="ts">
    import "../app.postcss";
    import Navigation from "$lib/components/modules/Navigation/Navigation.svelte";
    import {theme} from "$lib/stores/theme";
    import {editor} from "$lib/stores/editor";
    import StoreSettingsCog from "$lib/components/store-settings/StoreSettingsCog.svelte";
    import AgeAuthorization from "$lib/components/modules/AgeAuthorization/AgeAuthorization.svelte";
    import {store} from "$lib/stores/store";
    import {cookies} from "$lib/stores/cookies";
    import EditorLogin from "$lib/components/EditorLogin.svelte";
    import {browser} from "$app/environment";
    import {onMount} from "svelte";

    export let data;

    let is18 = data["cookies"]["is18"];

    if (data["theme"]) {
        $theme = data["theme"];

        if (data["theme"]["store"]) {
            $store = data["theme"]["store"];
        }
    }

    if (data["cookies"]) {
        $cookies = data["cookies"];
    }

    theme.subscribe((conf) => {
        $store = conf["store"] || {};
    })

    $editor.enabled = data?.cookies?.authenticated;

    const documentHeight = () => {
        if (browser) {
            const doc = document.documentElement
            doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
        }
    }
    if (browser) {
        window.addEventListener("resize", documentHeight)
        documentHeight();

        if (window.EcwidApp) {
            console.log(window.EcwidApp)
            try {
                window.EcwidApp.init({
                    app_id: "custom-app-81408535-1",
                    autoloadedflag: true,
                    autoheight: true
                });
                let storeData = window.EcwidApp?.getPayload();
                console.log(storeData);

            } catch (error) {
                console.error(error);
            }


        }
    }

</script>

{#if data["editor"] !== null && !data?.cookies?.authenticated}
    <main>
        <EditorLogin/>
    </main>
{:else}
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

{/if}

<style lang="scss">
  main {
    @apply flex flex-col w-screen h-screen overflow-x-hidden relative;
  }
</style>