<script lang="ts">
    import Collection from "$lib/components/modules/Collection/Collection.svelte";

    export let data;
    console.log(data)
</script>

<div class="cc-container">
    <div class="flex flex-col w-full p-4">
        <div class="flex flex-col w-full my-4 pb-2 border-b-2 border-solid border-gray-300">
            <h1>Search Results</h1>
            <div class="flex justify-between items-center w-full mt-8 flex-wrap">
                <div class="flex items-center text-2xl"><span
                        class="material-symbols-outlined text-3xl mr-2">list</span> {data["products"]["total"]} item(s)
                </div>
            </div>
        </div>
        {#if data["products"]["total"] > 0}
            <Collection products={data["products"]["items"]} sortBy={1}/>
        {:else}
            <h1>No results found...</h1>
        {/if}
    </div>
</div>

<style lang="scss">
  .cc-container {
    @apply grid grid-cols-1 w-full h-full;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  h1 {
    @apply text-3xl font-medium;
  }
</style>