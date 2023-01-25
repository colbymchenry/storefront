<script lang="ts">
    import {schema} from "./schema";
    import Component from "$lib/components/component/Component.svelte";
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import ProductGridItem from "$lib/components/ProductGridItem.svelte";

    export let products: ILSProduct[];
    export let sortBy: number = 1;

    $: if (sortBy === 1) {
        products.sort((a,b) => new Date(a.createTimestamp) - new Date(b.createTimestamp));
        products = products;
    } else if (sortBy === 2) {
        products.sort((a,b) => new Date(b.createTimestamp) - new Date(a.createTimestamp));
        products = products;
    } else if (sortBy === 3) {
        products.sort((a,b) => a.name.localeCompare(b.name));
        products = products;
    } else if (sortBy === 4) {
        products.sort((a,b) => b.name.localeCompare(a.name));
        products = products;
    } else if (sortBy === 5) {
        products.sort((a,b) => a.price - b.price);
        products = products;
    } else if (sortBy === 6) {
        products.sort((a,b) => b.price - a.price);
        products = products;
    }

</script>

<Component {schema} let:props>
    <div class={`products grid-cols-${props.mobileGridCount} lg:grid-cols-${props.desktopGridCount}`}>
        {#each products as product}
            <ProductGridItem {product} props={{...props, width: "auto", imgHeight: "100%"}}/>
        {/each}
    </div>
</Component>

<style lang="scss">
  section {
    @apply grid grid-cols-2;
  }

  h1 {
    @apply text-lg mb-1 md:mb-4;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .products {
    @apply overflow-x-hidden overflow-y-auto max-h-fit relative grid w-full gap-4;
    grid-auto-rows: 1fr;
  }
</style>
