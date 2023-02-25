<script lang="ts">
    import {activeModal} from "$lib/stores/modals";
    import Swal from "sweetalert2";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {invalidateAll} from "$app/navigation";
    import StaffModal from "./StaffModal.svelte";

    export let data;

    function createStaff() {
        $activeModal = {
            component: StaffModal,
            props: {}
        }
    }

    function deleteStaff(userId) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#e71e1e',
            denyButtonColor: '#595959',
            confirmButtonText: 'Yes, delete!',
            denyButtonText: 'Never mind',
            showCloseButton: true,
            showDenyButton: true,
            preConfirm: async () => {
                return await lightspeedClientUtils.deleteStaff(userId)
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Staff deleted.',
                    icon: 'success'
                }).then(async () => {
                    await invalidateAll();
                    window.location.reload()
                });
            }
        })
    }
</script>

<section>
    <div class="flex w-full border-b border-solid border-gray-200 pb-4 mb-4">
        <button class="btn" type="button" on:click={createStaff}>Create Staff Account</button>
    </div>

    {#if !data?.staff?.length}
        <h1 class="text-2xl font-medium">No data to display</h1>
    {/if}

    {#each data["staff"] as staff}
        <div class="store">
            <div class="flex w-full justify-between items-center py-2">
                <h2 class="text-xl font-medium">{staff.email}</h2>

                <button type="button" on:click={() => deleteStaff(staff.id)}>
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        </div>
    {/each}
</section>

<style lang="scss">
  section {
    @apply flex flex-col;
  }

  .btn {
    @apply bg-gray-100 border border-solid border-gray-300 py-3 px-4 text-gray-600 hover:bg-gray-200 transition;
  }

  .store {
    @apply flex flex-col border border-solid border-gray-200 shadow-md p-3 my-2;
  }
</style>
