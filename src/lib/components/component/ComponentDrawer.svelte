<script lang="ts">
    import {formHelper} from "$lib/utils/form-helper";
    import {onMount, tick} from "svelte";
    import {theme} from "$lib/stores/theme";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";

    export let visible = false;
    export let title: string;
    export let key: string;
    export let submit;

    let saving: boolean = false;
    let status: 'success' | 'error' | undefined = undefined;
    let form;
    let backup = JSON.parse(JSON.stringify($theme));

    async function onSubmit(e) {
        if (saving || !key) return;
        saving = true;
        await tick();

        let formData = formHelper.getFormData(e.target);

        if (submit) {
            await submit(formData);
            formData = formHelper.getFormData(e.target);
        }

        try {
            $theme[key] = formData;
            await firebaseClientUtils.set("settings", "theme", $theme);
            status = 'success';
        } catch (error) {
            console.error(error);
            $theme = backup;
            status = 'error';
        }
        saving = false;
        setTimeout(() => status = undefined, 2500);
    }

    // TODO: RESET NOT WORKING
    function reset() {
        $theme = backup;
    }

    $: if (!visible) reset();

    onMount(() => {
        if (!key || !$theme[key]) return;

        Array.from(form.getElementsByTagName("INPUT")).forEach((input) => {
            if (input.name && $theme[key][input.name]) {
                input.value = $theme[key][input.name];
            }
        });
    })
</script>

<div class="main" class:visible>
    <div class="flex items-center justify-between shadow-md px-3 py-2 border-b border-solid border-gray-300 bg-indigo-700 text-white sticky top-0 left-0">
        <button class="bg-none border-none outline-none" type="button" on:click={() => visible = false}>
            <span class="material-symbols-outlined text-3xl">close</span>
        </button>

        <h1 class="text-xl mr-2">{title || ""} - Settings</h1>
    </div>
    <form bind:this={form} class="flex flex-col w-full flex-grow" on:submit|preventDefault={onSubmit}>
        <div class="flex flex-col w-full flex-grow px-3 py-3">
            <slot/>
        </div>
        <div class="flex w-full items-center justify-between sticky left-0 bottom-0 shadow-md px-3 py-2 bg-gray-100">
            <button type="button" class="btn px-3 py-2" on:click={reset}>Reset</button>
            {#if status === 'success'}
                <button type="button" class="btn px-3 py-2 bg-green-500 text-white hover:bg-green-500">Saved!</button>
            {:else if status === 'error'}
                <button type="button" class="btn px-3 py-2 bg-red-500 text-white hover:bg-red-500">Error</button>
            {:else}
                <button type="submit"
                        class="btn px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">{saving ? 'Saving...' : 'Save'}</button>
            {/if}
        </div>
    </form>
</div>

<style lang="scss">
  .main {
    @apply flex flex-col fixed top-0 right-0 max-h-screen min-h-screen shadow-lg bg-white overflow-y-auto z-50;
    transition: all 0.2s ease;
    width: 500px;
    margin-right: -600px;

    &.visible {
      margin-right: 0;
    }
  }
</style>