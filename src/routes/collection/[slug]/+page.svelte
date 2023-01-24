<script lang="ts">
    import Collection from "$lib/components/modules/Collection/Collection.svelte";

    export let data;

    console.log(data)
</script>

<div class="cc-container">
    <div class="controls">

    </div>
    <div class="flex flex-col w-full p-4">
        <div class="flex flex-col w-full my-4 pb-2 border-b-2 border-solid border-gray-300">
            <h1>{data.category.name}</h1>
            <div class="flex justify-between items-center w-full mt-8">
                <div class="flex items-center text-2xl"><span class="material-symbols-outlined text-3xl mr-2">list</span> {data["products"]["total"]} item(s)</div>
                <div class="flex items-center">
                    <label for="sortBy">
                        Sort by
                    </label>
                    <select id="sortBy" class="bg-gray-200 rounded-md py-2 px-3 ml-2">
                        <option value="">Default</option>
                        <option value="">Date (Oldest - Latest)</option>
                        <option value="">Date (Latest - Oldest)</option>
                        <option value="">Name (A - Z)</option>
                        <option value="">Name (Z - A)</option>
                        <option value="">Price (Low > High)</option>
                        <option value="">Price (High > Low)</option>
                    </select>
                </div>
            </div>
        </div>
        <Collection products={data["products"]["items"]}/>
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