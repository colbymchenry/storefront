<script lang="ts">
    export let min: number = 1;
    export let max: number = 10;
    export let step: number = 1;
    export let values: number[] = [];
    export let value: number = min || 0;

    if (!values.length) {
        for(let i = min; i < max; i+=step) {
            values = [...values, i];
        }
    }

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
    }
</script>

<svelte:window on:click={() => {
    dragging = false;
}} on:mouseup={() => {
    dragging = false;
}} on:mousemove={handleDrag}/>

<div class="w-full flex items-center gap-5">
    <div bind:this={track} class="track">
        <div bind:this={thumb} class="thumb" on:mousedown={() => dragging = true}></div>
        <div bind:this={progress} class="progress"></div>
    </div>
    <div class="value">{value}</div>
</div>


<style lang="scss">
  .track {
    @apply w-full flex items-center relative flex-grow;

    &::after {
      @apply absolute w-full outline outline-gray-500;
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
    @apply w-4;
  }
</style>