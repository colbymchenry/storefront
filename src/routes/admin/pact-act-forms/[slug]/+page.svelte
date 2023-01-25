<script lang="ts">
    import Input from "$lib/components/component/Input.svelte";
    import {onMount} from "svelte";
    import Swal from "sweetalert2";
    import {api} from "$lib/stores/api";
    import {goto} from "$app/navigation";

    export let data;

    let loading: boolean = false;
    let success: boolean = false;
    let errors = {};

    onMount(() => {
        if (data?.form?.businessLicense && data?.form?.businessLicense !== "data:") {
            let image = new Image();
            image.src = data.form.businessLicense;
            document.getElementById("businessLicense").innerHTML = '';
            document.getElementById("businessLicense").appendChild(image)
        }

        if (data?.form?.tobaccoLicense && data?.form?.tobaccoLicense !== "data:") {
            let image = new Image();
            image.src = data.form.tobaccoLicense;
            document.getElementById("tobaccoLicense").innerHTML = '';
            document.getElementById("tobaccoLicense").appendChild(image)
        }
    })

    function deny() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deny',
            showCloseButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let resp = await api.post('/api/pact-act-form', {
                    id: data.form.id,
                    approved: false,
                    denied: true
                })
            }
        })
    }

    function approve() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Approve',
            showCloseButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
               try {
                   let resp = await api.post('/api/pact-act-form', {
                       id: data.form.id,
                       approved: true,
                       denied: false
                   })

                   await goto("/admin/pact-act-forms");
               } catch (error) {

               }
            }
        })
    }

</script>

<form>
    <h2 class="text-xl font-medium mb-4">Pact Act Form - {data?.form?.created_at ? new Date(data.form.created_at).toLocaleDateString() : 'N/A'}</h2>
    <div>
        <Input name="firstName" required value={data?.form?.firstName} disabled>
            First name
        </Input>
        <Input name="lastName" required value={data?.form?.lastName} disabled>
            Last name
        </Input>
        <Input name="companyName" required value={data?.form?.companyName} disabled>
            Company name
        </Input>
        <Input name="email" type="email" value={data?.form?.email} disabled>
            Email
        </Input>
        <Input name="phoneNumber" type="text" placeholder="000-000-0000" required value={data?.form?.phoneNumber}
               disabled>
            Phone number
        </Input>
        <Input name="fein" type="text" value={data?.form?.fein} required disabled>
            FEIN
        </Input>
        <Input name="store" type="select" disabled required options={data?.stores?.map((store) => {
            return {
                label: store.storeName,
                value: store.id
            }
        })}>
            Store
        </Input>
    </div>

    <div class="mt-10">
        <div class="flex flex-col">
            <h3 class="text-xl font-medium mb-2">Business License</h3>
            <div id="businessLicense" class="border-2 border-solid border-gray-300">
                <h3 class="text-lg font-medium m-2">No Business License Available</h3>
            </div>
        </div>

        <div></div>

        <div class="flex flex-col">
            <h3 class="text-xl font-medium mb-2">Tobacco License</h3>
            <div id="tobaccoLicense" class="border-2 border-solid border-gray-300">
                <h3 class="text-lg font-medium m-2">No Tobacco License Available</h3>
            </div>
        </div>
    </div>

    <div class="!flex items-center justify-start">
        <button type="button" on:click={deny}
                class="bg-white !px-8 !text-black border border-solid border-gray-300 hover:bg-gray-100">Deny
        </button>
        <button type="button" on:click={approve} class="bg-green-600 !px-8 hover:bg-green-700">Approve</button>
    </div>

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
    @apply text-white px-2 py-1 rounded-lg self-start mt-6 transition;
    &.success {
      @apply bg-green-500 text-white;
    }
  }
</style>