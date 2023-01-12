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
    <img src={product.hdThumbnailUrl} loading="lazy" class={`h-${props?.imgHeight}`}/>
    <span><strong>{product.name}</strong></span>
    {#if product?.attributes?.length && product.attributes.find((att) => att.type === "UPC")}
        <small>UPC: {product.attributes.find((att) => att.type === "UPC").value}</small>
    {/if}

    <button type="button" on:click={addToCart} class={`bg-${props?.buttonBgColor || 'black'} text-${props?.buttonTextColor || 'white'}`}>Add to Cart</button>
</a>

<style lang="scss">
  .product {
    @apply flex flex-col max-h-full relative;
    text-align: center;
    width: 20vh;
    min-width: 20vh;

    span {
      @apply text-xs md:text-sm mt-4 flex-grow;
      font-family: 'IBM Plex Sans', sans-serif;
    }

    small {
      @apply my-2;
    }

    img {
      width: auto;
      object-fit: contain;
    }
  }
</style>