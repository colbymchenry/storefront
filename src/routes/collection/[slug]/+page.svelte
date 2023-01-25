<script lang="ts">
    import Collection from "$lib/components/modules/Collection/Collection.svelte";
    import {cookies} from "$lib/stores/cookies.js";
    import {goto} from "$app/navigation";
    import {store} from "$lib/stores/store.js";

    export let data;

    let sortBy = 1;

    async function innerWidth(e) {
        let node = e.target.parentNode.querySelector(".expandable");
        if (!node) return;

        let rect = node.querySelector("DIV").getBoundingClientRect();

        if (node.style.maxHeight === "0px") {
            node.style.maxHeight = (rect.height + 20) + 'px';
        } else node.style.maxHeight = 0;
    }

</script>

<svelte:head>
    <title>{$store.businessName} | {data.category.seoTitle || data.category.name}</title>
    <meta name="description" content={data.category.seoDescription} />
</svelte:head>

<div class="w-full max-h-fit overflow-hidden">
    <div class="cc-container">
        <div class="flex flex-col p-2 mt-6 sticky top-0 left-0 overflow-auto">
            <span class="text-2xl font-medium mb-4">Product Categories</span>
            <div class={`flex flex-col w-full items-stretch items-center text-black overflow-auto rounded-lg border border-solid border-gray-300`}>
                {#each $cookies.categories.items as category, index}
                    {#if !category.parentId}
                        <div class:pr-8={$cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                             class={`flex flex-col items-center relative whitespace-nowrap transition ${index < $cookies.categories.items.length ? "border-b" : ""} border-solid border-gray-300 px-2 py-1`}>
                            <div class="flex w-full justify-between items-center cursor-pointer"
                                 on:click={(e) => $cookies.categories.items.filter((cat) => cat.parentId === category.id).length ? innerWidth(e) : goto("/collection/" + category.id)}>
                                <span class="pointer-events-none">{category.name}</span>
                                {#if $cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                                    <span class="pointer-events-none absolute right-0 material-symbols-outlined">expand_more</span>
                                {/if}
                            </div>

                            {#if $cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                                <div class={`expandable flex flex-col text-black overflow-hidden w-full overflow-hidden`}
                                     style="max-height: 0;">
                                    <div class="flex flex-col w-full">
                                        <a href={`/collection/${category.id}`}
                                           class={`relative whitespace-nowrap transition mt-4 mx-4 font-bold`}>All {category.name}</a>
                                        {#each $cookies.categories.items.filter((cat) => cat.parentId === category.id) as cat}
                                            {#if $cookies.categories.items.filter((c) => c.parentId === cat.id).length}
                                                <div class="relative flex flex-col min-w-10 mx-4 text-black">
                                                    <strong class="mt-2 underline">{cat.name}</strong>
                                                    {#each $cookies.categories.items.filter((c) => c.parentId === cat.id) as c}
                                                        <a href={`/collection/${cat.id}`}
                                                           class={`relative whitespace-nowrap transition my-1`}>{c.name}</a>
                                                    {/each}
                                                </div>
                                            {:else}
                                                <a href={`/collection/${cat.id}`}
                                                   class={`relative whitespace-nowrap transition my-1 mx-4`}>{cat.name}</a>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>

                            {/if}
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="flex flex-col w-full p-4 overflow-hidden">
            <div class="flex flex-col w-full my-4 pb-2 border-b-2 border-solid border-gray-300">
                <h1>{data.category.name}</h1>
                <div class="flex justify-between items-center w-full mt-8 flex-wrap">
                    <div class="flex items-center text-2xl"><span
                            class="material-symbols-outlined text-3xl mr-2">list</span> {data["products"]["total"]}
                        item(s)
                    </div>
                    <div class="flex items-center mt-4 sm:mt-0">
                        <label for="sortBy">
                            Sort by
                        </label>
                        <select id="sortBy" class="border border-solid border-gray-500 rounded-md py-2 px-3 ml-2"
                                on:change={(e) => sortBy = parseInt(e.target.value)}>
                            <option value="1" selected>Date (Oldest - Latest)</option>
                            <option value="2">Date (Latest - Oldest)</option>
                            <option value="3">Name (A - Z)</option>
                            <option value="4">Name (Z - A)</option>
                            <option value="5">Price (Low > High)</option>
                            <option value="6">Price (High > Low)</option>
                        </select>
                    </div>
                </div>
            </div>
            <Collection products={data["products"]["items"]} {sortBy}/>
        </div>
    </div>
</div>

<style lang="scss">
  .cc-container {
    @apply grid w-full h-full;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr;

    @media screen and (max-width: 740px) {
      grid-template-columns: 1fr;
      > div:first-of-type {
        @apply hidden;
      }
    }
  }

  h1 {
    @apply text-3xl font-medium;
  }

  .expandable {
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  }

</style>