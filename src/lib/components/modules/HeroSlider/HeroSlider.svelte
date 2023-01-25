<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {schema} from "./schema";
    import {Splide, SplideSlide} from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import '@splidejs/svelte-splide/css/core';

    export let key: string = undefined;

    let useFilter = (b) => b.image instanceof Object ? false : b.image?.includes('http')
</script>

<div class="w-full">
    <Component {schema} {key} let:props>
        <div class={`flex relative bg-black overflow-hidden`}
             style={
             (!props.getBlocks("Slide").filter(useFilter).length ? 'min-height: 10vh;': '') +
             (!props.autoHeight ? `min-height: ${props.height}vh;max-height: ${props.height}vh;` : '')
             }>

            <Splide aria-label={props.alt} options={ {
                type: 'loop',
            }}>
                {#each props.getBlocks("Slide").filter(useFilter) as block, index}
                    <SplideSlide>
                        <img src={block.image} alt={props.alt}/>
                    </SplideSlide>
                {/each}
            </Splide>

        </div>
    </Component>
</div>

<style lang="scss">
  img {
    @apply w-full h-full;
  }

  .slider-container {
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  }
</style>