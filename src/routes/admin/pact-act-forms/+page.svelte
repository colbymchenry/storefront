<script lang="ts">
    import Input from "$lib/components/component/Input.svelte";
    import {goto} from '$app/navigation';

    export let data;

    async function update(e) {
        await goto("/admin/pact-act-forms?status=" + e.target.value)
    }
</script>

<section>
    <div class="flex justify-end w-full">
        <Input type="select" on:change={update} options={[
            {
                "label": "Needs Approval",
                "value": "needsApproval"
            },
            {
                 "label": "Approved",
                 "value": "approved"
            },
            {
                "label": "Denied",
                "value": "denied"
            }
        ]}>
            Filter by status
        </Input>
    </div>
    {#each data["forms"] as form}
        <div class="store">
            <div class="flex w-full justify-between items-center border-b border-solid border-gray-200 pb-4">
                <h2 class="text-xl font-medium">{form.companyName}</h2>
                <a href={"/admin/pact-act-forms/" + form.id} class="btn">View Store</a>
            </div>
            <div class="flex w-full pt-2">
                <div class="flex-shrink flex flex-col border-r border-solid border-gray-200 pr-3">
                    <small>Phone No. <strong>{form.phoneNumber || 'N/A'}</strong></small>
                    <small>Street. <strong>{form.street || 'N/A'}</strong></small>
                </div>
                <div class="flex-grow flex flex-col pl-3">
                    <small>Email. <strong>{form.email || 'N/A'}</strong></small>
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