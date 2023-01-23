<script lang="ts">
    import {schema} from "$lib/components/modules/FeaturedCollection/schema";
    import Component from "$lib/components/component/Component.svelte";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {store} from "$lib/stores/store.js";
    import ProductGridItem from "$lib/components/ProductGridItem.svelte";

    export let key: string = undefined;

    let props: any;

    async function fetchProducts() {
        let params = new URLSearchParams();
        params.append('categories', props.collection);
        return await lightspeedClientUtils.getProducts(params);
    }
</script>

<Component {schema} {key} bind:props>
    {#if props}
        <section class={`min-h-${props.imgHeight}`}>
            <h1 style={`align-self: flex-start;`}
                class={`border-b-4 border-solid border-${$store.primaryColor}`}>{props.title || "Featured Collection"}</h1>
            {#if !props.collection}
                <h1>Pick a collection</h1>
            {:else}
                {#await fetchProducts() then products}
                    <div class="products">
                        {#each products as product}
                            <ProductGridItem {product} {props}/>
                        {/each}
                    </div>
                {:catch error}
                    <h1 class="text-red-500">An error occurred.</h1>
                {/await}

            {/if}
        </section>
    {/if}
</Component>

<style lang="scss">
  section {
    @apply flex flex-col w-full p-4 min-w-full relative overflow-hidden;
  }

  h1 {
    @apply text-lg mb-1 md:mb-4;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .products {
    @apply overflow-x-auto overflow-y-hidden max-h-full relative flex flex-nowrap gap-10 py-4;
  }
</style>


