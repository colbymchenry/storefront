<script lang="ts">
    export let data;
</script>

<section>
    <div class="w-full flex justify-between items-center border-b border-solid border-gray-200 pb-4 mb-6">
        <h1 class="text-2xl font-medium">Support Tickets</h1>
        <a href="/account/support/new-ticket" class="btn">New Ticket</a>
    </div>

    {#each data["tickets"] as ticket}
        <div class="store">
            <div class="flex w-full justify-between items-center border-b border-solid border-gray-200 pb-4">
                <h2 class="text-xl font-medium">{ticket.subject}</h2>
                <a href={"/account/support/ticket/" + ticket.id} class="btn">View Ticket</a>
            </div>
            <div class="flex w-full pt-2">
                <div class="flex-shrink flex flex-col border-r border-solid border-gray-200 pr-3">
                    <small>Store. <strong>{ticket.store || 'N/A'}</strong></small>
                    <small>Date. <strong>{ticket?.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'N/A'}</strong></small>

                </div>
                <div class="flex-grow flex flex-col pl-3">
                    <small>Email. <strong>{ticket.email}</strong></small>
                    <small>Status. <strong
                            class:text-green-600={ticket.open}
                            class:text-gray-400={!ticket.open}
                    >{ticket.open ? "Open" : "Closed"}</strong></small>
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

