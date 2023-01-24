<script lang="ts">
    import Collection from "$lib/components/modules/Collection/Collection.svelte";

    export let data;

    let sortBy = 1;

</script>

<div class="cc-container">
    <div class="controls">

    </div>
    <div class="flex flex-col w-full p-4">
        <div class="flex flex-col w-full my-4 pb-2 border-b-2 border-solid border-gray-300">
            <h1>{data.category.name}</h1>
            <div class="flex justify-between items-center w-full mt-8 flex-wrap">
                <div class="flex items-center text-2xl"><span class="material-symbols-outlined text-3xl mr-2">list</span> {data["products"]["total"]} item(s)</div>
                <div class="flex items-center mt-4 sm:mt-0">
                    <label for="sortBy">
                        Sort by
                    </label>
                    <select id="sortBy" class="border border-solid border-gray-500 rounded-md py-2 px-3 ml-2" on:change={(e) => sortBy = parseInt(e.target.value)}>
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

<style lang="scss">
  .cc-container {
    @apply grid grid-cols-1 lg:grid-cols-2 w-full h-full;
    grid-template-columns: 0.25fr 1fr;
    grid-template-rows: 1fr;

    @media screen and (max-width: 740px) {
      grid-template-columns: 1fr;
    }
  }

  h1 {
    @apply text-3xl font-medium;
  }
</style>