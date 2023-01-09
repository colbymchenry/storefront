<script lang="ts">
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";

    export let product: ILSProduct = undefined;
    export let props: any = undefined;

</script>

<a href={`/product/${product.id}`} class="product">
    <img src={product.hdThumbnailUrl} loading="lazy" class={`h-${props?.imgHeight}`}/>
    <span><strong>{product.name}</strong></span>
    {#if product?.attributes?.length && product.attributes.find((att) => att.type === "UPC")}
        <small>UPC: {product.attributes.find((att) => att.type === "UPC").value}</small>
    {/if}
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
      @apply mt-2;
    }

    img {
      width: auto;
      object-fit: contain;
    }
  }
</style>