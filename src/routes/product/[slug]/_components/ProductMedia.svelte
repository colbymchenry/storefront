<script lang="ts">
    import type ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {onDestroy, onMount} from "svelte";
    import {browser} from "$app/environment";

    export let product: ILSProduct = undefined;
    export let variations: ILSProduct[] = undefined;

    let container: HTMLElement;
    let gallery: HTMLElement;
    let show: boolean = false;

    onMount(() => {
        let rect = container.getBoundingClientRect();
        Array.from(gallery.getElementsByTagName("DIV")).forEach((elem:HTMLElement) => {
            elem.style.minWidth = rect.width + 'px';
        })
        show = true;
    })

    onDestroy(() => {
        if (browser) {
            window.removeEventListener("resize", documentHeight)
        }
    })

    function getVariation(option, choice) {
        return variations.find((variation: any) => variation.options.find((v) => v.name === option.name && v.value === choice.text));
    }

    function getVariationImages() {
        let images = [];
        product.options.forEach((option) => {
            option.choices.forEach((choice) => {
                let variation = getVariation(option, choice);
                if (variation && variation["imageUrl"]) images.push(variation["imageUrl"]);
            })
        })
        return images;
    }

    const documentHeight = () => {
        if (browser) {
            let isMobile = window.innerWidth < 1000;
            let rect = isMobile ? container.closest(".product-container").getBoundingClientRect() : container.getBoundingClientRect();
            Array.from(gallery.getElementsByTagName("DIV")).forEach((elem:HTMLElement) => {
                elem.style.minWidth = rect.width + 'px';
            })
            gallery.style.minWidth = rect.width + 'px';
        }
    };

    let addedEventListener = false;
    $: if (browser && container && !addedEventListener) {
        window.addEventListener("resize", documentHeight);
        addedEventListener = true;
    }
</script>

<div bind:this={container} class="flex flex-col w-full cc-container" class:show>
    <div bind:this={gallery} class="gallery">
        {#each product?.media?.images || [] as media}
            <div class="flex items-center">
                <img src={media.imageOriginalUrl} loading="lazy" alt="product image" />
            </div>
        {/each}
    </div>
    <div class="thumbnails">
        {#each product?.media?.images || [] as media}
            <button type="button">
                <img src={media.image400pxUrl} loading="lazy" alt="thumbnail" />
            </button>
        {/each}
    </div>
</div>

<style lang="scss">
  .cc-container {
    @apply opacity-0;
    transition: all 0.8s ease;
    &.show {
      @apply opacity-100;
    }
  }
    .thumbnails {
      @apply flex items-center mt-3 justify-center;

      button {
        @apply border-2 border-solid border-gray-400 mx-1;
        img {
          width: 4rem;
          height: 4rem;
        }

        &:hover {
          @apply border-black;
        }
      }
    }

    .gallery {
      @apply flex flex-nowrap overflow-auto;

      img {
        height: 100%;
        width: auto;
        @media screen and (max-width: 1000px) {
          width: calc(100% - 6rem);
        }

        @media screen and (max-width: 600px) {
          width: calc(100% - 2rem);
        }
      }
    }
</style>