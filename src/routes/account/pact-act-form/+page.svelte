<script lang="ts">
    import {formHelper} from "$lib/utils/form-helper";
    import {store} from "$lib/stores/store";
    import Input from "$lib/components/component/Input.svelte";
    import {cookies} from "$lib/stores/cookies.js";

    export let data;

    async function submitForm(e) {
        let formData = formHelper.getFormData(e.target);


    }

</script>

<form on:submit|preventDefault={submitForm}>
    <h1 class="text-2xl font-medium mb-4">Pact Act Form</h1>
    <p class="text-lg mb-12">For all current and future resellers, {$store.businessName} is required to obtain the following information. In order
        to remain our customer and to become a future customer, please submit the following form to ensure we have your
        information on file.</p>

    <h2 class="text-xl font-medium mb-4">Personal Information</h2>
    <div>
        <Input name="firstName" required value={data?.profile?.firstName}>
            First name
        </Input>
        <Input name="lastName" required value={data?.profile?.lastName}>
            Last name
        </Input>
        <Input name="companyName" required value={data?.profile?.companyName}>
            Company name
        </Input>
        <Input name="email" type="email" disabled value={$cookies?.email}>
            Email
        </Input>
        <Input name="phoneNumber" type="text" placeholder="000-000-0000" required regex="^\d{3}\-\d{3}\-\d{4}$" value={data?.profile?.phoneNumber}>
            Phone number
        </Input>
        <Input name="fein" type="text" value={data?.profile?.fein} required>
            FEIN
        </Input>
    </div>
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
</style>