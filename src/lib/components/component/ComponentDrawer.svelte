<script lang="ts">
    import {formHelper} from "$lib/utils/form-helper";
    import {theme} from "$lib/stores/theme";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import type {ISchema} from "$lib/components/component/ISchema";
    import Input from "$lib/components/component/Input.svelte";
    import {tick} from "svelte";
    import SectionHeader from "$lib/components/component/SectionHeader.svelte";
    import Accordion from "$lib/components/Accordion.svelte";
    import {objectHelper} from "$lib/utils/object-helper";

    export let visible = false;
    export let submit = undefined;
    export let schema: ISchema = undefined;

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

        try {
            if (submit) {
                await submit(formData);
                formData = formHelper.getFormData(e.target);
            }

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
                        if ($theme[schema.tag] && $theme[schema.tag][key]) {
                            try {
                                await firebaseClientUtils.deleteFile($theme[schema.tag][key]);
                            } catch (error) {

                            }
                        }
                        delete formData[key];
                    }
                } else if (key === "blocks") {
                    // if we are in blocks we have types of blocks
                    return await Promise.all(Object.keys(value).map(async (blockType) => {
                        // now we are iterating over each block KEY = Math.random()
                        let blockEntries = value[blockType];
                        // the value is full of settings
                        await Promise.all(Object.keys(blockEntries).map(async (blockIterationKey: string) => {
                            return await Promise.all(Object.keys(blockEntries[blockIterationKey]).map(async (key: string) => {
                                // grab the setting value
                                let value = blockEntries[blockIterationKey][key];
                                // if value is a file upload the file
                                if (value instanceof File) {
                                    if (value?.name) {
                                        try {
                                            // Upload image to Cloud Storage
                                            let extension = value.name.split(".")[value.name.split(".").length - 1];
                                            formData["blocks"][blockType][blockIterationKey][key] = await firebaseClientUtils.uploadFile(value, schema.tag + '/' + blockType + '/' + blockIterationKey + '/' + key + "." + extension);
                                        } catch (error) {
                                            console.error(error);
                                            delete formData[key];
                                        }
                                    } else {
                                        if ($theme[schema.tag] && $theme[schema.tag][key]) {
                                            try {
                                                await firebaseClientUtils.deleteFile($theme[schema.tag][key]);
                                            } catch (error) {

                                            }
                                        }
                                        delete formData[key];
                                    }
                                }
                            }));

                        }));
                    }));
                }
            }));
            uploading = false;

            if (formData?.blocks) {
                let blocks = {};
                for (let property in formData.blocks) {
                    blocks[property] = [];
                    for (let value in formData.blocks[property]) {
                        blocks[property].push(formData.blocks[property][value])
                    }
                }
                formData.blocks = blocks;
            }

            $theme[schema.tag] = formData;
            $theme = $theme;

            await firebaseClientUtils.set("settings", "theme", JSON.parse(JSON.stringify($theme)));
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

    function addBlock(block) {
        let defaultValue = {};
        block.settings.forEach((setting) => {
            if (setting.default) {
                defaultValue[setting.id] = setting.default;
            }
        });

        if (!$theme[schema.tag] || !$theme[schema.tag]["blocks"] || !$theme[schema.tag]["blocks"][block.name]) {
            if (!$theme[schema.tag]) {
                $theme[schema.tag] = {};
            }
            if (!$theme[schema.tag]["blocks"]) {
                $theme[schema.tag]["blocks"] = {};
            }
            $theme[schema.tag]["blocks"][block.name] = [];
        }

        $theme[schema.tag]["blocks"][block.name] = [...$theme[schema.tag]["blocks"][block.name], defaultValue];
    }

    function reset() {
        $theme = backup;
    }

    $: if (!visible) reset();

    async function deleteBlock(blockIndex, block) {
        let blocks = [...$theme[schema.tag]["blocks"][block.name]];

        blocks.splice(blockIndex, 1); // 2nd parameter means remove one item only

        $theme[schema.tag]["blocks"][block.name] = blocks;
        await tick();
        await onSubmit({
            target: form
        });
    }

    async function move(blockIndex, block, up: boolean) {
        let blocks = [...$theme[schema.tag]["blocks"][block.name]];
        if (up) {
            if (blockIndex > 0) {
                objectHelper.arrayMove(blocks, blockIndex, blockIndex - 1);
            }
        } else {
            if (blockIndex < blocks.length - 1) {
                objectHelper.arrayMove(blocks, blockIndex, blockIndex + 1);
            }
        }

        $theme[schema.tag]["blocks"][block.name] = blocks;
        await tick();
        await onSubmit({
            target: form
        });
    }

    async function renameBlock(blockIndex, block, name) {
        if (!name || !name.length) {
            return;
        }
        $theme[schema.tag]["blocks"][block.name][blockIndex]["id"] = name;
        await tick();
        await onSubmit({
            target: form
        });
    }

</script>

<div class="main" class:visible>
    <div class="flex items-center justify-between shadow-md px-3 py-2 border-b border-solid border-gray-300 bg-indigo-700 text-white sticky top-0 left-0 z-50">
        <button class="bg-none border-none outline-none" type="button" on:click={() => visible = false}>
            <span class="material-symbols-outlined text-3xl">close</span>
        </button>

        <h1 class="text-xl mr-2">{schema?.name} - Settings</h1>
    </div>
    <form bind:this={form} class="flex flex-col w-full flex-grow" on:submit|preventDefault={onSubmit}>
        <div class="flex flex-col w-full flex-grow px-3 py-3 gap-5">

            {#if schema.information}
                <div class="text-gray-400 font-medium">
                    {@html schema.information}
                </div>
            {/if}

            {#if schema?.settings}
                {#each schema.settings as setting}
                    {#if setting.type === 'radio'}
                    {:else if setting.type === 'header'}
                        <SectionHeader>{setting.label}</SectionHeader>
                    {:else}
                        {#if $theme}
                            <Input {...setting} name={setting.id}
                                   value={schema.tag in $theme && setting.id in $theme[schema.tag] ? $theme[schema.tag][setting.id] : setting.default}>
                                {setting.label}
                            </Input>
                        {/if}
                    {/if}
                {/each}
            {/if}

            {#if schema?.blocks}
                {#each schema.blocks as block}
                    <div class="flex items-center">
                        <span class="font-medium">{block.name}</span>
                        <button type="button" class="ml-4 flex justify-center items-center w-8 h-8 bg-gray-300 rounded"
                                on:click={() => addBlock(block)}>
                            <span class="material-symbols-outlined text-gray-600 pointer-events-none">add_circle</span>
                        </button>
                    </div>
                    <div class="flex flex-col relative">
                        {#if $theme[schema.tag]?.blocks && $theme[schema.tag].blocks[block.name]}
                            {#each $theme[schema.tag].blocks[block.name] as blockData, blockIndex (blockData)}
                                <div class="flex items-start block">
                                    <div class="flex items-center flex-shrink py-4 mr-4">
                                        <button type="button" on:click={() => deleteBlock(blockIndex, block)}
                                                style="height: 1.5rem;">
                                            <span class="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </div>

                                    <Accordion title={``}
                                               clazz="bg-white shadow-sm my-1 rounded border border-solid border-gray-200 flex-grow">
                                        <svelte:fragment slot="title" let:open>
                                            <div class="flex">
                                                <div class="reorder" class:open>
                                                    <button type="button"
                                                            on:click|preventDefault|stopPropagation={() => move(blockIndex, block, true)}>
                                                        <span class="material-symbols-outlined">arrow_drop_down</span>
                                                    </button>
                                                    <button type="button"
                                                            on:click|preventDefault|stopPropagation={() => move(blockIndex, block, false)}>
                                                        <span class="material-symbols-outlined">arrow_drop_down</span>
                                                    </button>
                                                </div>

                                                <div class="flex ml-8">
                                                    <span contenteditable="true"
                                                          on:click|preventDefault|stopPropagation
                                                          on:focusout|preventDefault|stopPropagation={(e) => renameBlock(blockIndex, block, e.target.innerHTML)}>
                                                        {$theme[schema.tag]["blocks"][block.name][blockIndex]["id"] || block.name}
                                                    </span>
                                                    {#if $theme[schema.tag]["blocks"][block.name][blockIndex]["id"]}
                                                        <input type="hidden"
                                                               name={'blocks.' + block.name + '.' + blockIndex + '.id'}
                                                               value={$theme[schema.tag]["blocks"][block.name][blockIndex]["id"]}/>
                                                    {/if}
                                                </div>
                                            </div>
                                        </svelte:fragment>

                                        <div class="flex flex-col w-full gap-2">
                                            {#if block?.settings}
                                                {#each block.settings as setting}
                                                    {#if setting.type === 'radio'}
                                                    {:else if setting.type === 'header'}
                                                        <SectionHeader>{setting.label}</SectionHeader>
                                                    {:else}
                                                        {#if $theme && schema.tag in $theme && 'blocks' in $theme[schema.tag]}
                                                            <Input {...setting}
                                                                   name={'blocks.' + block.name + '.' + blockIndex + '.' + setting.id}
                                                                   value={setting.id in $theme[schema.tag]["blocks"][block.name][blockIndex] ? $theme[schema.tag]["blocks"][block.name][blockIndex][setting.id] : setting.default}>
                                                                {setting.label}
                                                            </Input>
                                                        {/if}
                                                    {/if}
                                                {/each}
                                            {/if}
                                        </div>
                                    </Accordion>
                                </div>
                            {/each}
                        {/if}
                    </div>
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
    @apply flex flex-col fixed top-0 right-0 max-h-screen min-h-screen shadow-lg bg-white overflow-y-auto;
    z-index: 60000;
    transition: all 0.2s ease;
    width: 500px;
    margin-right: -600px;

    &.visible {
      margin-right: 0;
    }
  }

  .reorder {
    @apply absolute top-0 left-0 flex flex-col justify-center items-center border-r border-solid border-inherit bg-inherit text-inherit;
    height: calc(100% + 1rem);
    margin-top: -0.5rem;
    margin-left: -0.5rem;

    > button:first-of-type {
      @apply border-b border-solid border-gray-200;

      > span {
        transform: rotate(180deg);
      }
    }

    button {
      @apply text-inherit;
      height: 1.25rem;
    }

    &.open {
      button:hover {
        @apply bg-blue-400;
      }
    }
  }
</style>