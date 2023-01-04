<script lang="ts">
    import {cookies} from "$lib/stores/cookies";
    import {api} from "$lib/stores/api";
    import ILSProductResponse from "$lib/interfaces/lightspeed/ILSProductResponse";
    import {objectHelper} from "$lib/utils/object-helper.js";

    export let name: string = undefined;
    export let value = undefined;

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
        console.log(url, value)
        focused = false;
    }

    let elem;
</script>

<!-- TODO: Need to add popup of options from typing -->

<svelte:window on:click={(e) => {
    if (!elem.contains(e.target) && focused) {
        focused = false;
    }
}} />

<div class="flex relative" bind:this={elem}>
    <input class="w-full" type="text" {name} id={name} bind:value on:focus={getProducts}
           on:focusin={() => focused = true}
    />

    <div class="results" class:visible={value !== undefined && focused}>
        {#if products && categories}
            <div class="flex flex-col relative">
                <div class="sticky top-0 bg-white px-1 py-1 bg-gray-100 border-y border-solid border-gray-300"><strong>Products</strong></div>
                {#each products.items.filter((item) => item.name.toLowerCase()?.includes(value.toLowerCase())) as product}
                    <span on:click|preventDefault|stopPropagation={() => setValue(`/product/${objectHelper.slugify(product.name)}`)}>{product.name}</span>
                {/each}
                <div style="height: 1.5rem;"></div>
            </div>
            <div class="flex flex-col relative">
                <div class="sticky top-0 bg-white px-1 py-1 bg-gray-100 border-y border-solid border-gray-300"><strong>Categories</strong></div>
                {#each categories.items.filter((item) => item.name.toLowerCase()?.includes(value.toLowerCase())) as category}
                    <span on:click|preventDefault|stopPropagation={() => setValue(`/collection/${objectHelper.slugify(category.name)}`)}>{category.name}</span>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
  input, select {
    @apply px-2 py-3 text-slate-800 bg-gray-200 rounded-lg cursor-text;
  }

  .results {
    @apply w-full absolute top-0 left-0 bg-white shadow-md rounded-lg;
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