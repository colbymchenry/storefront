<script lang="ts">
    import type ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import ProductOptions from "$lib/components/ProductOptions.svelte";
    import ProductMedia from "./_components/ProductMedia.svelte";
    import AddToCart from "$lib/components/modules/AddToCart/AddToCart.svelte";
    import {onMount} from "svelte";
    import {productStore} from "$lib/utils/lightspeed-utils";
    import {store} from "$lib/stores/store.js";

    export let data;

    let product: ILSProduct = data["product"];
    let variations: ILSProduct[] = data["variations"];

    onMount(() => {
        if (!$productStore.products[product.id]) {
            $productStore.products[product.id] = product;
        }
        if (!$productStore.variations[product.id]) {
            $productStore.variations[product.id] = variations;
        }
    });
</script>

<svelte:head>
    <title>{$store.businessName} | {data.product.seoTitle || data.product.name}</title>
    <meta name="description" content={data.product.seoDescription} />
</svelte:head>

<div class="product-container">
    <div class="product-images">
        <ProductMedia {product} {variations}/>
    </div>
    <form class="product-form">
        <h1 class="mb-6">{product.name}</h1>
        <ProductOptions {product} {variations}/>
        <AddToCart {product}/>
    </form>
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

