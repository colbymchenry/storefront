<script lang="ts">
    import {schema} from "./schema";
    import Component from "$lib/components/component/Component.svelte";
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import ProductGridItem from "$lib/components/ProductGridItem.svelte";

    export let products: ILSProduct[];
    export let sortOrder: number = 1;


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
    @apply overflow-x-auto overflow-y-hidden max-h-full relative grid w-full gap-4;
    grid-auto-rows: 1fr;
  }
</style>
