<script lang="ts">
    export let data;

    console.log(data)
</script>

<section>
    <div class="w-full flex justify-between items-center border-b border-solid border-gray-200 pb-4 mb-10">
        <h1 class="text-2xl font-medium">Manage Stores</h1>
        <a href="/account/stores/new" class="btn">New Store</a>
    </div>

    {#each data["stores"] as store}
        <div class="store">
            <div class="flex w-full justify-between items-center border-b border-solid border-gray-200 pb-4">
                <h2 class="text-xl font-medium">{store.storeName}</h2>
                <a href={"/account/stores/" + store.id} class="btn">View Store</a>
            </div>
            <div class="flex w-full pt-2">
                <div class="flex-shrink flex flex-col border-r border-solid border-gray-200 pr-3">
                    <small>Phone No. <strong>{store.phoneNumber || 'N/A'}</strong></small>
                    <small>Street. <strong>{store.street || 'N/A'}</strong></small>
                </div>
                <div class="flex-grow flex flex-col pl-3">
                    <small>Email. <strong>{store.email || 'N/A'}</strong></small>
                </div>

            </div>
        </div>
    {/each}
</section>

<style lang="scss">
  section {
    @apply flex flex-col;
  }

  .btn {
    @apply bg-black text-white px-2 py-1 rounded-lg transition;
  }

  .store {
    @apply flex flex-col border border-solid border-gray-200 shadow-md p-3 my-2;
  }
</style>

