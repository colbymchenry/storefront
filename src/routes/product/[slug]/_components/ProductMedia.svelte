<script lang="ts">
    import type ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {Splide, SplideSlide} from "@splidejs/svelte-splide";
    import '@splidejs/svelte-splide/css';
    import '@splidejs/svelte-splide/css/core';
    import {onMount} from "svelte";

    export let product: ILSProduct = undefined;
    export let variations: ILSProduct[] = undefined;

    let mainSplide, thumbnailSplide;

    onMount(() => {
        mainSplide.splide.sync(thumbnailSplide.splide);
    })
</script>

<div class="flex flex-col product-media">
    <Splide aria-label={product.name + " images"} bind:this={mainSplide} options={{
         pagination: false,
        arrows    : true
    }}>
        {#each product?.media?.images as media, index}
            <SplideSlide>
                <img src={media.imageOriginalUrl} alt="product image"/>
            </SplideSlide>
        {/each}
    </Splide>
    <div class="thumbnails">
    <Splide options={{
      fixedWidth  : 100,
      fixedHeight : 60,
      gap         : 10,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
       arrows    : false,
      breakpoints : {
        600: {
          fixedWidth : 60,
          fixedHeight: 44,
        },
      },
    }} bind:this={thumbnailSplide}>
        {#each product?.media?.images as media, index}
            <SplideSlide>
                <img src={media.imageOriginalUrl} alt="product image"/>
            </SplideSlide>
        {/each}
    </Splide>
    </div>
</div>

<style lang="scss">
    .thumbnails img {
      @apply h-full w-full object-scale-down;
    }
</style>