<script lang="ts">
    import {formHelper} from "$lib/utils/form-helper";
    import {onMount, tick} from "svelte";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {store} from "$lib/stores/store";
    import Input from "$lib/components/component/Input.svelte";
    import SectionHeader from "$lib/components/component/SectionHeader.svelte";
    import ColorPicker from "$lib/components/component/InputColor.svelte";

    export let visible = false;
    export let submit;

    let saving: boolean = false;
    let status: 'success' | 'error' | undefined = undefined;
    let form;
    let backup = JSON.parse(JSON.stringify($store));

    async function onSubmit(e) {
        if (saving) return;
        saving = true;
        await tick();

        let formData = formHelper.getFormData(e.target);

        if (submit) {
            await submit(formData);
            formData = formHelper.getFormData(e.target);
        }

        try {
            $store = formData;
            await firebaseClientUtils.update("settings", "main", $store);
            backup = JSON.parse(JSON.stringify($store));
            status = 'success';
        } catch (error) {
            console.error(error);
            $store = backup;
            status = 'error';
        }
        saving = false;
        setTimeout(() => status = undefined, 2500);
    }

    // TODO: RESET NOT WORKING
    function reset() {
        $store = backup;
    }

    $: if (!visible) reset();

    onMount(() => {
        Array.from(form.getElementsByTagName("INPUT")).forEach((input) => {
            if (input.name && $store[input.name]) {
                input.value = $store[input.name];
            }
        });
    })
</script>

<div class="main" class:visible>
    <div class="flex items-center justify-between shadow-md px-3 py-2 border-b border-solid border-gray-300 bg-indigo-700 text-white sticky top-0 left-0">
        <button class="bg-none border-none outline-none" type="button" on:click={() => visible = false}>
            <span class="material-symbols-outlined text-3xl">close</span>
        </button>

        <h1 class="text-xl mr-2">Store Settings</h1>
    </div>
    <form bind:this={form} class="flex flex-col w-full flex-grow" on:submit|preventDefault={onSubmit}>
        <div class="flex flex-col w-full flex-grow px-3 py-3">
            <Input name="storeName">Store Name</Input>

            <SectionHeader>Store Colors</SectionHeader>
            <div class="w-full flex items-center justify-between mt-6 mb-8">
                <div class="flex items-center">
                    <strong class="mr-2">Primary Color</strong>
                    <ColorPicker name="primaryColor"/>
                </div>
                <div class="flex items-center">
                    <strong class="mr-2">Secondary Color</strong>
                    <ColorPicker name="secondaryColor"/>
                </div>
            </div>
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