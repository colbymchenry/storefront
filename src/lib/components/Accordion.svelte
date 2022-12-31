<script lang="ts">
    export let title: string = undefined;
    export let clazz: string = undefined;
    export let open: boolean = false;

    function handleOpen() {
        let bounds = content.querySelector("DIV").getBoundingClientRect();
        content.style.maxHeight = bounds.height + 'px';
    }

    function handleClose() {
        content.style.maxHeight = '0px';
    }

    $: if (content) {
        if (open) handleOpen();
        if (!open) handleClose();
    }

    let content: HTMLElement;
</script>

<div class={`flex flex-col w-full bg-blue-50 ${clazz}`}>
    <button class="transition flex text-left items-center w-full py-3 px-3 bg-white text-gray-500" on:click={() => open = !open} class:open>
        <div class="flex-grow">
            {#if title}
                {@html title}
            {/if}
        </div>
        <div type="button" class="flex items-center">
            <span class="material-symbols-outlined transition" style={open ? 'transform: rotate(180deg);' : ''}>expand_more</span>
        </div>
    </button>
    <div bind:this={content} class="content" class:open>
        <div class="relative w-full pt-6 py-3 px-3">
            <slot/>
        </div>
    </div>
</div>

<style lang="scss">
  .content {
    @apply max-h-0 overflow-hidden relative;
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  }

  button.open {
    @apply bg-blue-500 text-white overflow-hidden;
  }
</style>