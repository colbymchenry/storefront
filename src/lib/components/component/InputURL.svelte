<script lang="ts">
    import {cookies} from "$lib/stores/cookies";
    import {api} from "$lib/stores/api";
    import ILSProductResponse from "$lib/interfaces/lightspeed/ILSProductResponse";
    import {objectHelper} from "$lib/utils/object-helper.js";

    export let name: string = undefined;
    export let value = undefined;
    export let hideProducts: boolean = false;
    export let hideCollections: boolean = false;

    let categories = $cookies.categories;
    let products: ILSProductResponse;
    let focused: boolean = false;

    async function getProducts() {
        if (products) return;
        try {
            let res = await api.get('/api/products');
            products = res.data;
        } catch (error) {
            console.error(error);
        }
    }

    function setValue(url) {
        value = url;
        focused = false;
    }

    let elem;
    let resultsElem;

    $: if (elem && resultsElem && focused) {
        let bounds = elem.getBoundingClientRect();
        resultsElem.style.left = bounds.left + 'px';
        resultsElem.style.top = bounds.top + 'px';
        resultsElem.style.width = bounds.width + 'px';
    }

    $: if (value !== undefined && focused) {
        if (resultsElem && elem) {
            let resultsElemBounds = resultsElem.getBoundingClientRect();
            let bounds = elem.getBoundingClientRect();
            if (resultsElemBounds.top <= 0) {
                resultsElem.style.marginTop = "0px";
                resultsElem.style.top = bounds.bottom + 'px';
            }
        }
    }
</script>

<svelte:window on:click={(e) => {
    if (!elem.contains(e.target) && focused) {
        focused = false;
    }
}}/>

<div class="flex relative" bind:this={elem}>
    <input class="w-full" type="text" {name} id={name} bind:value on:focus={getProducts}
           on:focusin={() => focused = true}
    />

    <div bind:this={resultsElem} class="results" class:visible={value !== undefined && focused}>
        {#if !hideProducts}
            <div class="flex flex-col relative">
                <div class="sticky top-0 bg-white px-1 py-1 bg-gray-100 border-y border-solid border-gray-300">
                    <strong>Products</strong></div>
                {#if products && value}
                    {#each products.items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.id.toString().includes(value.toLowerCase())) as product}
                        <span on:click|preventDefault|stopPropagation={() => setValue(`/product/${product.id}`)}>{product.name}</span>
                    {/each}
                {/if}
                <div style="height: 1.5rem;"></div>
            </div>
        {/if}
        {#if !hideCollections}
            <div class="flex flex-col relative">
                <div class="sticky top-0 bg-white px-1 py-1 bg-gray-100 border-y border-solid border-gray-300">
                    <strong>Categories</strong>
                </div>
                {#if categories && value}
                    {#each categories.items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) ||  item.id.toString().includes(value.toLowerCase())) as category}
                        <span on:click|preventDefault|stopPropagation={() => setValue(`/collection/${category.id}`)}>{category.name}</span>
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
  input, select {
    @apply px-2 py-3 text-slate-800 bg-gray-200 rounded-lg cursor-text;
  }

  .results {
    @apply w-full fixed bg-white shadow-md rounded-lg;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column !important;
    display: none;
    height: 250px;
    margin-top: -250px;

    &.visible {
      @apply flex flex-col;
    }

    span {
      @apply py-1 px-2 cursor-pointer hover:bg-gray-100;
    }
  }
</style>