<script lang="ts">
    import Input from "$lib/components/component/Input.svelte";
    import {goto} from "$app/navigation";

    export let data;

    async function update(e) {
        await goto("/admin?status=" + e.target.value)
    }
</script>

<section>
    <div class="flex w-full items-end justify-between">
        <Input type="text" placeholder="Search ticket #">
            Ticket #
        </Input>
        <Input type="select" on:change={update} options={[
            {
                "label": "Open",
                "value": "open"
            },
            {
                 "label": "Closed",
                 "value": "closed"
            }
        ]}>
            Filter by status
        </Input>

    </div>

    <div class="orders">
        <table style="table-layout: fixed;">
            <thead>
            <tr>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">receipt_long</span>
                        Ticket
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">event</span>
                        Date
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">person</span>
                        Customer
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">playlist_add_check_circle</span>
                        Status
                    </div>
                </th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {#if !data?.tickets?.length}
                <tr>
                    <td>
                        No data to display
                    </td>
                </tr>
            {:else}
                {#each data.tickets as ticket}
                    <tr>
                        <td>
                            {ticket.id}
                        </td>
                        <td>
                            {new Date(ticket.created_at).toLocaleDateString()}
                        </td>
                        <td>
                            {ticket.email}
                        </td>
                        <td>
                            <strong class="ml-2"
                                    class:text-green-600={ticket.open}
                                    class:text-gray-400={!ticket.open}
                            >{ticket.open ? "Open" : "Closed"}</strong>
                        </td>
                        <td>
                            <a href={"/admin/ticket/" + ticket.id} class="btn">View Ticket</a>
                        </td>
                    </tr>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
</section>

<style lang="scss">
  section {
    @apply w-full flex flex-col;
  }

  .orders {
    @apply flex w-full flex-col shadow-md border border-solid border-gray-200 mt-6;

    table {
      thead {
        tr {
          @apply border-b border-solid border-gray-200;

          th {
            @apply px-2 py-2;
            text-align: left;
          }
        }
      }
    }

    td {
      @apply px-3 py-3;
    }
  }

  .btn {
    @apply bg-black text-white px-2 py-1 rounded-lg transition;
  }

</style>