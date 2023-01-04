<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";

    let slide: number = 0;

    let useFilter = (b) => b.image instanceof Object ? false : b.image?.includes('http')

    function handleNext(props) {
        let blocks = props.getBlocks("Slide").filter(useFilter);
        slide = slide + 1 > blocks.length - 1 ? 0 : slide + 1;
    }

    function handleBack(props) {
        let blocks = props.getBlocks("Slide").filter(useFilter);
        slide = slide - 1 === -1 ? blocks.length - 1 : slide - 1;
    }
</script>

<div class="w-full">
    <Component {schema} let:props>
        <div class={`flex relative bg-black overflow-hidden`} style={!props.getBlocks("Slide").filter(useFilter).length ? 'min-height: 20vh;': ''}>
            <div class={`flex flex-nowrap w-full slider-container`} style={`margin-left: -${100 * slide}%;`}>
                {#each props.getBlocks("Slide").filter(useFilter) as block, index}
                    <img src={block.image} loading="lazy" alt={props.alt}/>
                {/each}
            </div>

            <div class={`absolute top-0 left-0 w-full h-full grid grid-rows-3 z-10 p-1 md:p-3 text-${props.controlsColor}`}>
                <div></div>
                <div class="flex justify-between align-center w-full h-full">
                    <button type="button" class="opacity-80 hover:opacity-100 transition" on:click={() => handleBack(props)}>
                        <span class="flex items-center justify-center material-symbols-outlined text-sm md:text-lg pointer-events-none">arrow_back_ios</span>
                    </button>
                    <button type="button" class="opacity-80 hover:opacity-100 transition" on:click={() => handleNext(props)}>
                        <span class="flex items-center justify-center material-symbols-outlined text-sm md:text-lg pointer-events-none">arrow_forward_ios</span>
                    </button>
                </div>
                <div class="flex justify-center items-end h-full">
                    {#each props.getBlocks("Slide").filter(useFilter) as block, index}
                        <button type="button" class="hover:opacity-100 transition" on:click={() => slide = index}
                                class:opacity-100={slide === index} class:opacity-80={slide !== index}>
                            <span class="material-symbols-outlined mx-1 shadow-2xl text-sm md:text-lg pointer-events-none">
                                {#if slide === index}
                                    radio_button_checked
                                {:else}
                                    radio_button_unchecked
                                {/if}
                            </span>
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </Component>
</div>

<style lang="scss">
  img {
    @apply w-full h-full object-contain;
  }

  .slider-container {
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  }
</style>