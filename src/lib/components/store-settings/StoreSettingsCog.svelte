<script lang="ts">

    import {editor} from "$lib/stores/editor";
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";

    let visible = false;

</script>

<button class="settings" type="button" on:click={() => visible = true}>
    <span class="material-icons animate-spin">settings</span>
</button>

<div class="devices">
    <span class="material-icons">{$editor.device === 'desktop' ? 'computer' : $editor.device === 'tablet' ? 'tablet_android' : 'smartphone'}</span>
    <div class="inside">
        <button type="button" on:click={() => visible = true}>
            <span class="material-icons">computer</span>
        </button>

        <button type="button" on:click={() => visible = true}>
            <span class="material-icons">tablet_android</span>
        </button>

        <button type="button" on:click={() => visible = true}>
            <span class="material-icons">smartphone</span>
        </button>
    </div>
</div>

<Component {schema} bind:editorOpen={visible}/>

<style lang="scss">
  .settings {
    @apply flex items-center justify-center fixed top-24 right-0 bg-indigo-700 text-white py-2 pl-4 pr-2 shadow-lg rounded-l-full z-20;

    span {
      animation-duration: 3s !important;
    }
  }

  .devices {
    @apply flex items-center justify-center fixed top-24 right-0 bg-indigo-700 text-white py-2 pl-4 shadow-lg rounded-l-full z-20 mt-12;
    margin-right: -8.5rem;
    transition: all 0.2s ease;

    &:hover {
      margin-right: 0;
    }

    > span:first-of-type {
      @apply border-r-2 border-solid border-indigo-900 pr-3;
    }

    .inside {
      @apply flex items-center pl-2;
    }

    button {
      @apply flex items-center mx-2;
    }
  }
</style>