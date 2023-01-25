<script lang="ts">
    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {cookies} from "$lib/stores/cookies.js";
    import {goto} from "$app/navigation";

    export let data;

    let success: boolean = false;
    let loading: boolean = false;

    async function submitForm(e) {
        if (loading || success) return;
        loading = true;

        let formData = formHelper.getFormData(e.target);

        try {
             await lightspeedClientUtils.createCustomer(formData);
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
        <Input name="phoneNumber" type="text" placeholder="000-000-0000" regex="^\d{3}\-\d{3}\-\d{4}$" value={data?.profile?.phoneNumber}>
            Phone number
        </Input>
        <Input name="taxId" type="text" value={data?.profile?.taxId}>
            Tax ID
        </Input>
    </div>

    <button type="submit" class:success disabled={loading || success}>{success ? "Profile Updated!" : loading ? "Please wait..." : "Update Profile"}</button>
</form>

<style lang="scss">
  form {
    @apply flex flex-col w-full;
    > div {
      @apply grid grid-cols-2 gap-4;
    }

    @media screen and (max-width: 740px) {
      > div {
        @apply grid-cols-1;
      }
    }
  }

  button {
    @apply bg-black text-white px-2 py-1 rounded-lg self-start mt-6 transition;

    &.success {
      @apply bg-green-500 text-white;
    }
  }
</style>