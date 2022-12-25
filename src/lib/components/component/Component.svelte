<script lang="ts">
    import ComponentDrawer from "$lib/components/component/ComponentDrawer.svelte";
    import {editor} from "$lib/stores/editor";
    import {theme} from "$lib/stores/theme";

    export let title: string;
    export let key: string;
    export let editorOpen: boolean = false;
    export let clazz: string;
</script>

<div class={'relative ' + clazz} class:editing={$editor.enabled} on:click={() => editorOpen = true}>
    <slot props={$theme[key]}/>
</div>

{#if $editor.enabled && $$slots.props}
    <ComponentDrawer bind:visible={editorOpen} {title} {key}>
        <slot name="props" />
    </ComponentDrawer>
{/if}

<style lang="scss">

    .editing {
      &:after {
        @apply absolute top-0 left-0 w-full h-full bg-indigo-500 bg-opacity-0 transition cursor-pointer;
        content: '';
      }
      &:hover {
        &:after {
          @apply bg-opacity-40;
        }
      }
    }

    .editing::after {

    }
</style>
