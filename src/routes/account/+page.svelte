<script lang="ts">
    import Input from "$lib/components/component/Input.svelte";

    export let data;
</script>

<section>
    <div class="flex w-full items-end justify-between">
        <Input type="text" placeholder="Search order #">
            Order #
        </Input>
        <div class="flex items-center">
            <Input type="date" name="startDate">
                Start date
            </Input>
            <Input type="date" name="endDate" clazz="ml-2">
                End date
            </Input>
        </div>
    </div>

    <div class="orders">
        <table style="table-layout: fixed;">
            <thead>
            <tr>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">receipt_long</span>
                        Order #
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
                        <span class="material-symbols-outlined mr-1">store</span>
                        Ship To
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">attach_money</span>
                        Cost
                    </div>
                </th>
                <th>
                    <div class="flex items-center">
                        <span class="material-symbols-outlined mr-1">playlist_add_check_circle</span>
                        Status
                    </div>
                </th>
            </tr>
            </thead>

            <tbody>
            {#if !data?.orders?.length}
                <tr>
                    <td>
                        No data to display
                    </td>
                </tr>
            {:else}

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
      @apply px-2 py-1;
    }
  }


</style>