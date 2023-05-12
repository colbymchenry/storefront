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
    import {activeModal} from "$lib/stores/modals.js";
    import {onMount} from "svelte";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";

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

    $editor.enabled = $cookies.admin;

    const documentHeight = () => {
        if (browser) {
            const doc = document.documentElement
            doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
        }
    }
    if (browser) {
        window.addEventListener("resize", documentHeight)
        documentHeight();
    }

    onMount(() => {
        firebaseClientUtils.auth.onAuthStateChanged(async (user) => {
            if (user) {
                firebaseClientUtils.updateStore((oldVal: any) => {
                    console.log("AUTHENTICATION STORE UPDATED.", user);
                    return {...oldVal, currentUser: user};
                });
            }
        });
    })

</script>

<svelte:head>
    <title>{$store.businessName}</title>
</svelte:head>

{#if data["editor"] !== null && !data?.cookies?.authenticated}
    <main>
        <EditorLogin/>
    </main>
{:else}
    <main>
        {#if $cookies.admin}
            <div class="w-full p-4 bg-black">
                Admin
            </div>
        {/if}
        <Navigation/>
        <slot/>
    </main>

    {#if !is18}
        <AgeAuthorization/>
    {/if}

    {#if $editor.enabled}
        <StoreSettingsCog/>
    {/if}

{/if}

{#if $activeModal?.component}
    <svelte:component this={$activeModal.component} {...$activeModal.props}/>
{/if}

<style lang="scss">
  main {
    @apply flex flex-col w-full h-full max-h-full overflow-x-hidden overflow-y-auto relative;
  }
</style>