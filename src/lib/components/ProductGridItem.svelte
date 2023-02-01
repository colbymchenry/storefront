<script lang="ts">
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import AddToCart from "$lib/components/modules/AddToCart/AddToCart.svelte";

    export let product: ILSProduct = undefined;
    export let props: any = undefined;
</script>

<a href={`/product/${product.id}`} class="product"
   style={`min-width: ${props.width || "20"}vh;width: ${props.width || "20vh"};`}>
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

    <span class={`price text-${props.priceColor} text-2xl`}
          style={`font-family: ${props.priceFont};`}>{product.defaultDisplayedPriceFormatted}</span>

    <form>
        <AddToCart {product} showOptions clazz="!text-lg !h-12" style={`font-family: ${props.priceFont};`}/>
    </form>
</a>


<style lang="scss">
  .product {
    @apply flex flex-col max-h-full relative;
    text-align: center;

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