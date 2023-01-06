<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";

    export let min: number = 1;
    export let max: number = 10;
    export let step: number = 1;
    export let values: number[] = [];
    export let value: number = values?.length ? values[0] : min || 0;
    export let name: string;
    export let unit: string;

    if (!values.length) {
        for (let i = min; i < max; i += step) {
            values = [...values, i];
        }
    }

    let dispatch = createEventDispatcher();
    let dragging: boolean = false;
    let thumb: HTMLElement;
    let track: HTMLElement;
    let progress: HTMLElement;

    function handleDrag(e) {
        if (!dragging) return;

        let trackRect = track.getBoundingClientRect();

        let marginLeft = e.x - trackRect.left;
        marginLeft = marginLeft < 0 ? 0 : marginLeft > trackRect.width ? trackRect.width : marginLeft;

        thumb.style.marginLeft = marginLeft + 'px';
        progress.style.width = ((marginLeft / trackRect.width) * 100) + '%';

        let percentVal = (marginLeft / trackRect.width);
        if (percentVal > 1) percentVal = 1;
        if (percentVal < 0) percentVal = 0;

        value = values[Math.min(Math.floor(values.length * percentVal), values.length - 1)];
        dispatch('change', value);
    }

    onMount(() => {
        let trackRect = track.getBoundingClientRect();
        let marginLeft = 0;
        if (values?.length) {
            let indexOf = values.indexOf(parseInt(value.toString()));
            marginLeft = indexOf / values.length;
            thumb.style.marginLeft = (marginLeft * 100) + '%';
            progress.style.width = (marginLeft * 100) + '%';
        } else {
            marginLeft = (value - min) / (max - min);
            marginLeft = trackRect.width * marginLeft;
            marginLeft = marginLeft < 0 ? 0 : marginLeft > trackRect.width ? trackRect.width : marginLeft;
            thumb.style.marginLeft = marginLeft + 'px';
            progress.style.width = ((marginLeft / trackRect.width) * 100) + '%';
        }

    })
</script>

<svelte:window on:click={() => {
    dragging = false;
}} on:mouseup={() => {
    dragging = false;
}} on:mousemove={handleDrag}/>

<div class="w-full flex items-center gap-2">
    <div bind:this={track} class="track">
        <div bind:this={thumb} class="thumb" on:mousedown={() => dragging = true}></div>
        <div bind:this={progress} class="progress"></div>
    </div>
    <div class="value">{value ? value + (unit ? unit : "") : "N/A"}</div>
    {#if name}
        <input type="hidden" bind:value {name}/>
    {/if}
</div>


<style lang="scss">
  .track {
    @apply flex items-center relative;
    width: calc(100% - 4rem);

    &::after {
      @apply w-full absolute outline outline-gray-500;
      content: '';
    }
  }

  .progress {
    @apply z-10 absolute outline outline-blue-500;
    content: '';
  }

  .thumb {
    @apply absolute rounded-full transition bg-gray-300 hover:bg-gray-400 border-gray-700 border-solid border-2 cursor-grab z-50;
    width: 1rem;
    height: 1rem;
  }

  .value {
    @apply w-4 ml-4;
  }
</style>