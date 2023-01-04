<script lang="ts">
    import ComponentDrawer from "$lib/components/component/ComponentDrawer.svelte";
    import {editor} from "$lib/stores/editor";
    import {theme} from "$lib/stores/theme";
    import type {ISchema} from "$lib/components/component/ISchema";
    import _ from 'lodash';

    export let editorOpen: boolean = false;
    export let submit;
    export let schema: ISchema;
    export let key: string = undefined;

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

        let tempSchema = {...schema, ...(key && {tag: schema.tag + '_' + key})};

        if ($theme[tempSchema.tag]?.blocks) {
            blocks = {...$theme[tempSchema.tag].blocks};

            Object.keys($theme[tempSchema.tag].blocks).forEach((blockName) => {
                let blockSchema = schema.blocks.find((b) => b.name === blockName);

                let defaultBlockObject = {};
                if (blockSchema?.settings?.length) {
                    blockSchema.settings.filter((setting) => setting.default).forEach((setting) => {
                        defaultBlockObject[setting.id] = setting.default;
                    });
                }

                let blockIds = Object.keys($theme[tempSchema.tag].blocks[blockName]);

                blockIds.forEach((blockId) => {
                    blocks[blockName][blockId] = {...defaultBlockObject, ...$theme[tempSchema.tag].blocks[blockName][blockId]}
                })
            })
        }

        return {...defaultObject, ...$theme[tempSchema.tag], blocks, getBlocks}
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

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp}/>

<div data-editor={true} class={`relative ${schema.class}`} class:editing={$editor.enabled && editing} on:click={() => {
    if (editing) {
        editorOpen = true;
    }
}}>
    {#key $theme}
        <slot props={props()}/>
    {/key}
</div>

{#if $editor.enabled && editorOpen}
    <ComponentDrawer bind:visible={editorOpen} {submit}
                     schema={{...schema, ...(key && { tag: schema.tag + '_' + key})}}/>
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
      z-index: 50000;
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
