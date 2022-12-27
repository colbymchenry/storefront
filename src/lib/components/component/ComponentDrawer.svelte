<script lang="ts">
    import {formHelper} from "$lib/utils/form-helper";
    import {theme} from "$lib/stores/theme";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import type {ISchema} from "$lib/components/component/ISchema";
    import Input from "$lib/components/component/Input.svelte";
    import {tick} from "svelte";

    export let visible = false;
    export let submit;
    export let schema: ISchema;

    let saving: boolean = false;
    let status: 'success' | 'error' | undefined = undefined;
    let form;
    let backup = JSON.parse(JSON.stringify($theme));
    let uploading = false;


    async function onSubmit(e) {
        if (saving || !schema?.tag) return;
        saving = true;
        await tick();

        let formData = formHelper.getFormData(e.target);

        // Uploading images
        uploading = true;
        await Promise.all(Object.keys(formData).map(async (key: string) => {
            let value = formData[key];
            if (value instanceof File) {
                if (value?.name) {
                    try {
                        // Upload image to Cloud Storage
                        let extension = value.name.split(".")[value.name.split(".").length - 1];
                        formData[key] = await firebaseClientUtils.uploadFile(value, schema.tag + '/' + key + "." + extension);
                    } catch (error) {
                        console.error(error);
                        delete formData[key];
                    }
                } else {
                    await firebaseClientUtils.deleteFile($theme[schema.tag][key]);
                    delete formData[key];
                }
            }
        }));
        uploading = false;

        try {
            if (submit) {
                await submit(formData);
                formData = formHelper.getFormData(e.target);
            }
            $theme[schema.tag] = formData;
            await firebaseClientUtils.set("settings", "theme", $theme);
            backup = JSON.parse(JSON.stringify($theme));
            status = 'success';
        } catch (error) {
            console.error(error);
            $theme = backup;
            status = 'error';
        }
        saving = false;
        setTimeout(() => status = undefined, 2500);
    }

    function reset() {
        $theme = backup;
    }

    $: if (!visible) reset();

</script>

<div class="main" class:visible>
    <div class="flex items-center justify-between shadow-md px-3 py-2 border-b border-solid border-gray-300 bg-indigo-700 text-white sticky top-0 left-0">
        <button class="bg-none border-none outline-none" type="button" on:click={() => visible = false}>
            <span class="material-symbols-outlined text-3xl">close</span>
        </button>

        <h1 class="text-xl mr-2">{schema?.name} - Settings</h1>
    </div>
    <form bind:this={form} class="flex flex-col w-full flex-grow" on:submit|preventDefault={onSubmit}>
        <div class="flex flex-col w-full flex-grow px-3 py-3 gap-5">
            {#if schema?.settings}
                {#each schema.settings as setting}
                    {#if setting.type === 'checkbox'}
                    {:else if setting.type === 'radio'}
                    {:else if setting.type === 'collection'}
                    {:else if setting.type === 'product'}
                    {:else}
                        <Input {...setting} name={setting.id}
                               value={$theme && schema.tag in $theme && $theme[schema.tag][setting.id] ? $theme[schema.tag][setting.id] : setting.default}>
                            {setting.label}
                        </Input>
                    {/if}
                {/each}
            {/if}
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