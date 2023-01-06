<script lang="ts">
    import {schema} from "$lib/components/modules/FeaturedCollection/schema";
    import Component from "$lib/components/component/Component.svelte";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {store} from "$lib/stores/store.js";
    import {objectHelper} from "$lib/utils/object-helper.js";

    export let key: string = undefined;

    let props: any;
    let products = undefined;
    let fetching: boolean = false;

    // TODO: Get products
    async function fetchProducts() {
        if (fetching) return;
        fetching = true;

        try {
            let params = new URLSearchParams();
            params.append('categories', props.collection);
            let res = await lightspeedClientUtils.getProducts(params);
            products = res.data.items;
        } catch (error) {
            console.error(error);
        }
        fetching = false;
    }

    $: if (props?.collection && !products && !fetching) {
        fetchProducts();
    }
</script>

<Component {schema} {key} bind:props>
    {#if props}
        <section class={`min-h-${props.imgHeight}`}>
            <h1 style={`align-self: flex-start;`}
                class={`border-b-4 border-solid border-${$store.primaryColor}`}>{props.title || "Featured Collection"}</h1>
            {#if !props.collection}
                <h1>Pick a collection</h1>
            {:else if fetching}

            {:else if products?.length}
                <div class="products">
                    {#each products as product}
                        <a href={`/product/${product.id}`} class="product">
                            <img src={product.hdThumbnailUrl} loading="lazy" class={`h-${props.imgHeight}`}/>
                            <span><strong>{product.name}</strong></span>
                            {#if product?.attributes?.length && product.attributes.find((att) => att.type === "UPC")}
                                <small>UPC: {product.attributes.find((att) => att.type === "UPC").value}</small>
                            {/if}
                        </a>
                    {/each}
                </div>
            {/if}
        </section>
    {/if}
</Component>

<style lang="scss">
  section {
    @apply flex flex-col w-full p-4 min-w-full relative overflow-hidden;
  }

  h1 {
    @apply text-lg mb-8;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .products {
    @apply overflow-x-auto overflow-y-hidden max-h-full relative flex flex-nowrap gap-10;
  }

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


