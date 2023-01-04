<script lang="ts">
    import ComponentDrawer from "$lib/components/component/ComponentDrawer.svelte";
    import {editor} from "$lib/stores/editor";
    import {theme} from "$lib/stores/theme";
    import type {ISchema} from "$lib/components/component/ISchema";

    export let editorOpen: boolean = false;
    export let submit;
    export let schema: ISchema;

    if (!schema?.tag) {
        console.error("INVALID SCHEMA!!!")
    }

    let editing = false;

    function onKeyDown(e) {
        if (e.code.toLowerCase().includes("alt")) {
            editing = true;
        }
    }

    function onKeyUp(e) {
        if (e.code.toLowerCase().includes("alt")) {
            editing = false;
        }
    }

    export function props() {
        let defaultObject = {};

        if (schema?.settings?.length) {
            schema.settings.filter((setting) => setting.default).forEach((setting) => {
                defaultObject[setting.id] = setting.default;
            });
        }

        let blocks = {};

        if ($theme[schema.tag]?.blocks) {
            blocks = {...$theme[schema.tag].blocks};

            Object.keys($theme[schema.tag].blocks).forEach((blockName) => {
                let blockSchema = schema.blocks.find((b) => b.name === blockName);

                let defaultBlockObject = {};
                if (blockSchema?.settings?.length) {
                    blockSchema.settings.filter((setting) => setting.default).forEach((setting) => {
                        defaultBlockObject[setting.id] = setting.default;
                    });
                }

                let blockIds = Object.keys($theme[schema.tag].blocks[blockName]);

                blockIds.forEach((blockId) => {
                    blocks[blockName][blockId] = {...defaultBlockObject, ...$theme[schema.tag].blocks[blockName][blockId]}
                })
            })
        }

        return {...defaultObject, ...$theme[schema.tag], blocks, getBlocks}
    }

    function getBlocks(key: string) {
        let {blocks} = props();
        let values = [];
        for (let property in blocks[key]) {
            values.push(blocks[key][property])
            // console.log(`${property}: ${blocks[property]}`);
        }
        return values
    }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div data-editor={true} class={`relative ${schema.class}`} class:editing={$editor.enabled && editing} on:click={() => {
    if (editing) {
        editorOpen = true;
    }
}}>
    <slot props={props()} />
</div>

{#if $editor.enabled && editorOpen}
    <ComponentDrawer bind:visible={editorOpen} {submit} {schema} />
{/if}

<style lang="scss">

  .editing {
    &:after {
      @apply absolute w-full h-full outline outline-8 outline-green-500 transition cursor-pointer opacity-0;
      top: 0.4rem;
      left: 0.4rem;
      width: calc(100% - 0.8rem);
      height: calc(100% - 0.8rem);
      content: '';
    }

    &:hover {
      &:after {
        @apply opacity-100;
      }
    }
  }

  .editing::after {

  }
</style>
