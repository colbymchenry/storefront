<script lang="ts">
    import ComponentDrawer from "$lib/components/component/ComponentDrawer.svelte";
    import {editor} from "$lib/stores/editor";
    import {theme} from "$lib/stores/theme";

    export let title: string;
    export let key: string;
    export let editorOpen: boolean = false;
    export let clazz: string;
    export let submit;

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
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div class={'relative ' + clazz} class:editing={$editor.enabled && editing} on:click={() => {
    if (editing) {
        editorOpen = true;
    }
}}>
    <slot props={{...$theme[key], key}}/>
</div>

{#if $editor.enabled && $$slots.props}
    <ComponentDrawer bind:visible={editorOpen} {title} {key} {submit}>
        <slot name="props"/>
    </ComponentDrawer>
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
