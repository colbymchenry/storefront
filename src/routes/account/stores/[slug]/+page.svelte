<script lang="ts">

    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {statesTemplate} from "$lib/states.js";
    import {api} from "$lib/stores/api";
    import {goto} from "$app/navigation";

    export let data;

    let success: boolean = false;
    let loading: boolean = false;

    async function submitForm(e) {
        if (loading || success) return;
        loading = true;
        let formData = formHelper.getFormData(e.target);

        try {
            let res = await api.post('/api/store', formData)
            success = true;

            setTimeout(() => {
                goto("/account/stores");
            }, 2000);
        } catch (error) {
            console.error(error);
        }

        loading = false;
    }

</script>

<form on:submit|preventDefault={submitForm}>
    <h2>Store Details</h2>
    <div>
        <Input name="storeName" required value={data?.store?.storeName}>
            Store name
        </Input>
        <Input name="email" type="email" required value={data?.store?.email}>
            Email
        </Input>
        <Input name="phoneNumber" type="text" placeholder="000-000-0000" regex="^\d{3}\-\d{3}\-\d{4}$" required
               value={data?.store?.phoneNumber}>
            Phone number
        </Input>
    </div>
    <h2 class="mt-10">Store Address</h2>
    <div>
        <Input name="street" type="htmltextarea" required value={data?.store?.street}>
            Street address
        </Input>
        <Input name="countryCode" type="select" required value={data?.store?.countryCode} options={[
            {
                label: "United States",
                value: "US"
            }
        ]}>
            Country
        </Input>
        <Input name="stateOrProvinceCode" type="select" required value={data?.store?.state} options={statesTemplate}>
            State
        </Input>
        <Input name="postalCode" required value={data?.store?.postalCode}>
            Zip Code
        </Input>
        <Input name="city" required value={data?.store?.city}>
            City
        </Input>

        {#if data?.store?.id}
            <input type="hidden" name="id" value={data.store.id} />
        {/if}
    </div>

    <button type="submit" class:success>{success ? `Store ${data.new ? "Created" : "Updated"}!` : data.new ? "Create Store" : "Update Store"}</button>
</form>

<style lang="scss">
  form {
    @apply flex flex-col w-full;
    > div {
      @apply grid grid-cols-2 gap-4;
    }
  }

  button {
    @apply bg-black text-white px-2 py-1 rounded-lg self-start mt-6 transition;

    &.success {
      @apply bg-green-500 text-white;
    }
  }

  h2 {
    @apply text-xl font-medium mb-2;
  }
</style>