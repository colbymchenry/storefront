<script lang="ts">

    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {statesTemplate} from "$lib/states.js";

    export let data;

    let success: boolean = false;

    async function submitForm(e) {
        let formData = formHelper.getFormData(e.target);

        try {
            await lightspeedClientUtils.createCustomer(formData);
            success = true;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <h2>Store Details</h2>
    <div>
        <Input name="storeName" required>
            Store name
        </Input>
        <Input name="email" type="email" required>
            Email
        </Input>
        <Input name="phoneNumber" type="text" placeholder="000-000-0000" regex="^\d{3}\-\d{3}\-\d{4}$" required>
            Phone number
        </Input>
    </div>
    <h2 class="mt-10">Store Address</h2>
    <div>
        <Input name="street" type="htmltextarea" required>
            Street address
        </Input>
        <Input name="countryCode" type="select" required options={[
            {
                label: "United States",
                value: "US"
            }
        ]}>
            Country
        </Input>
        <Input name="stateOrProvinceCode" type="select" required options={statesTemplate}>
            State
        </Input>
        <Input name="postalCode" required>
            Zip Code
        </Input>
        <Input name="city" required>
            City
        </Input>
    </div>

    <button type="submit">Create Store</button>
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
  }

  h2 {
    @apply text-xl font-medium mb-2;
  }
</style>