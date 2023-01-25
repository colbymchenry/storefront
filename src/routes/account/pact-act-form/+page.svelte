<script lang="ts">
    import {formHelper} from "$lib/utils/form-helper";
    import {store} from "$lib/stores/store";
    import Input from "$lib/components/component/Input.svelte";
    import {cookies} from "$lib/stores/cookies.js";
    import {api} from "$lib/stores/api";
    import {goto} from "$app/navigation";

    export let data;

    let loading: boolean = false;
    let success: boolean = false;
    let errors = {};

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function submitForm(e) {
        if (loading || success) return;
        loading = true;

        let formData = formHelper.getFormData(e.target);

        if ((formData["businessLicense"].size / 1024) / 1024 > 5) {
            errors["businessLicense"] = "Max file size 5 Mb.";
            loading = false;
            return;
        }

        if ((formData["tobaccoLicense"].size / 1024) / 1024 > 5) {
            errors["tobaccoLicense"] = "Max file size 5 Mb.";
            loading = false;
            return;
        }

        formData["businessLicense"] = await toBase64(formData["businessLicense"]);
        formData["tobaccoLicense"] = await toBase64(formData["tobaccoLicense"]);

        try {
            let resp = await api.post('/api/pact-act-form', formData);
            success = true;

            setTimeout(() => {
                goto("/account");
            }, 2000);
        } catch (error) {

        }
    }

</script>

<form on:submit|preventDefault={submitForm}>
    <h1 class="text-2xl font-medium mb-4">Pact Act Form</h1>
    <p class="text-lg mb-12">For all current and future resellers, {$store.businessName} is required to obtain the
        following information. In order
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
        <Input name="phoneNumber" type="text" placeholder="000-000-0000" required value={data?.profile?.phoneNumber}>
            Phone number
        </Input>
        <Input name="fein" type="text" value={data?.profile?.fein} required>
            FEIN
        </Input>
        <Input name="store" type="select" required options={data?.stores?.map((store) => {
            return {
                label: store.storeName,
                value: store.id
            }
        })}>
            Store
        </Input>
    </div>

    <h2 class="text-xl font-medium mb-2 mt-10">Business Uploads</h2>
    <p class="mb-6">Upload pictures of your EIN card or Business Certificate / License and Tobacco License if required
        by state. You can upload multiple files if necessary.</p>
    <div>
        <Input name="businessLicense" type="file" required accept="image/*,application/pdf"
               error={errors["businessLicense"]}>
            Upload a Photo of Your Business License
        </Input>

        <div></div>

        <Input name="tobaccoLicense" type="file" accept="image/*,application/pdf" error={errors["tobaccoLicense"]}>
            Upload a Photo of Your Tobacco License (IF REQUIRED BY STATE)
        </Input>
    </div>

    <button type="submit" class:success disabled={loading || success}>{success ? `Success!` : loading ? "Please wait..." : 'Register'}</button>
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