<script lang="ts">
    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {api} from "$lib/stores/api";

    export let data;

    let success: boolean = false;
    let loading: boolean = false;

    async function submitForm(e) {
        if (loading || success) return;
        loading = true;

        let formData = formHelper.getFormData(e.target);

        try {
            await api.post('/api/support/ticket', formData)
            success = true;

            setTimeout(() => {
                success = false;
            }, 2000);
        } catch (error) {
            console.error(error);
        }
        loading = false;
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <div>
        <div class="grid grid-cols-2 w-full gap-4">
            <Input name="orderId" required>
                Order #
            </Input>
            <div></div>
            <Input name="subject" required>
                Subject
            </Input>
            <div></div>
            <Input name="storeId" required type="select" options={data.stores.map((store) => {
                return {
                    "label": store.storeName,
                    "value": store.id
                }
            })}>
                Store
            </Input>
        </div>

        <br/>

        <Input name="description" type="textarea" required clazz="w-full">
            Description
        </Input>
    </div>

    <button type="submit" class:success
            disabled={loading || success}>{success ? "Ticket Created!" : loading ? "Please wait..." : "Create Ticket"}</button>
</form>

<style lang="scss">
  form {
    @apply flex flex-col w-full;
    > div {
      @apply flex flex-col items-start;
    }
  }

  button {
    @apply bg-black text-white px-2 py-1 rounded-lg self-start mt-6 transition;

    &.success {
      @apply bg-green-500 text-white;
    }
  }
</style>