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

    $: props = () => {
        let defaultObject = {};

        schema.settings.filter((setting) => setting.default).forEach((setting) => {
            defaultObject[setting.id] = setting.default;
        });

        return {...$theme[schema.tag], ...defaultObject}
    }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div class={`relative ${schema.class}`} class:editing={$editor.enabled && editing} on:click={() => {
    if (editing) {
        editorOpen = true;
    }
}}>
    <slot props={props()} />
</div>

{#if $editor.enabled}
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
