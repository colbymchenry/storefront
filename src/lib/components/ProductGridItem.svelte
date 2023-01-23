<script lang="ts">
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {cart} from "$lib/stores/cart";

    export let product: ILSProduct = undefined;
    export let props: any = undefined;

    async function addToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        await cart.addProduct(product.id);
    }
</script>

<a href={`/product/${product.id}`} class="product">
    {#if product.hdThumbnailUrl}
        <img src={product.hdThumbnailUrl} loading="lazy" class={`h-${props?.imgHeight}`}/>
    {:else}
        <div class="flex items-center justify-center flex-grow">
            <span class="material-symbols-outlined text-gray-300" style="font-size: 8rem;">category</span>
        </div>
    {/if}
    <span class="productName"><strong>{product.name}</strong></span>
    {#if product?.attributes?.length && product.attributes.find((att) => att.type === "UPC")}
        <small class="text-gray-400 flex-shrink">UPC: {product.attributes.find((att) => att.type === "UPC").value}</small>
    {/if}

    <button type="button" on:click={addToCart}
            disabled={!product.inStock || !product.enabled}
            class={`relative flex-shrink bg-${props?.buttonBgColor || 'black'} text-${props?.buttonTextColor || 'white'}`}>
        {#if !product.enabled}
            Not Available
        {:else if !product.inStock}
            Out of Stock
        {:else}
            Add to Cart
        {/if}
    </button>
</a>

<style lang="scss">
  .product {
    @apply flex flex-col max-h-full relative;
    text-align: center;
    width: 20vh;
    min-width: 20vh;

    .productName {
      @apply text-xs md:text-sm mt-4 flex-shrink;
      font-family: 'IBM Plex Sans', sans-serif;
    }

    small {
      @apply my-2;
    }

    img {
      flex-grow: 1;
      width: auto;
      object-fit: contain;
    }
  }

  button:disabled {
    @apply cursor-not-allowed;
    &:before {
      @apply absolute top-0 left-0 w-full h-full bg-white opacity-50;
      content: '';
    }
  }
</style>