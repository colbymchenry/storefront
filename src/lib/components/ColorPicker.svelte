<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let colors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    let colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const dispatch = createEventDispatcher();

    let visible: boolean;
    export let color: string;
    let colorBoxElem, colorPaletteElem;

    function openColorPalette() {
        if (!colorBoxElem || !colorPaletteElem) return;

        let bounds = colorBoxElem.getBoundingClientRect();
        colorPaletteElem.style.left = bounds.left + "px";
        colorPaletteElem.style.top = bounds.top + "px";
        visible = true;
    }

    function handleWindowClick(e) {
        if (!colorPaletteElem.contains(e.target) && !colorBoxElem.contains(e.target)) visible = false;
    }

    function handleColorClick(c) {
        dispatch('change', c);
        color = c;
        visible = false;
    }
</script>

<svelte:window on:click={handleWindowClick} />

<div class={`${color} w-6 h-6 relative`}>
    <div bind:this={colorBoxElem} class={`w-full h-full cursor-pointer border border-solid border-black hover:border-2`} on:click={openColorPalette}></div>
</div>


<div bind:this={colorPaletteElem} class="fixed top-0 left-0 flex flex-col z-50 shadow-lg outline outline-solid" style="width: 200px;" class:hidden={!visible}>
    {#each colors as color}
        <div class="w-full flex items-center">
            {#each colorLevels as level}
                <div class={`bg-${color}-${level} h-5 flex-grow transition hover:scale-125`} on:click={(e) => handleColorClick(`bg-${color}-${level}`)}></div>
            {/each}
        </div>
    {/each}
</div>