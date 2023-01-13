<script lang="ts">
    import type ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import ProductOptions from "./_components/ProductOptions.svelte";
    import ProductMedia from "./_components/ProductMedia.svelte";

    export let data;

    let product: ILSProduct = data["product"];
    let variations: ILSProduct[] = data["variations"];

    console.log("product", product)
</script>

<div class="product-container">
    <div class="product-images">
        <ProductMedia {product} {variations}/>
    </div>
    <div class="product-form">
        <h1 class="mb-6">{product.name}</h1>
        <ProductOptions {product} {variations}/>
    </div>
</div>

<style lang="scss">
  .product-container {
    @apply flex w-full px-24 py-16;

    .product-images {
      @apply flex mr-8;
      width: 46%;
    }

    .product-form {
      @apply flex flex-col flex-grow items-start;
      h1 {
        @apply text-2xl;
      }
    }
  }

  @media screen and (max-width: 1270px) {
    .product-container {
      @apply px-12;
    }
  }

  @media screen and (max-width: 1000px) {
    .product-container {
      @apply flex-col;
    }

    .product-images {
      @apply mb-12;
      width: 100% !important;
    }
  }

  @media screen and (max-width: 600px) {
    .product-container {
      @apply px-3 py-3;
    }
  }
</style>

