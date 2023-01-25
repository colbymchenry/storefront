<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import {store} from "$lib/stores/store.js";
    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";

    export let visible = true;

    let signup = false;
    let loading = false;
    let error = undefined;
    let errors = {};

    async function onSubmit(e) {
        if (loading) return;

        let formData = formHelper.getFormData(e.target);

        if (signup) {
            if (formData["password"].length < 6) {
                errors["password"] = "Password must contain at least 6 characters.";
                errors = errors;
                return;
            }
            if (formData["password"] !== formData["passwordConfirm"]) {
                errors["passwordConfirm"] = "Passwords do not match.";
                errors = errors;
                return;
            }
        }

        loading = true;

        try {

            let user = signup ? await firebaseClientUtils.createUser(formData["email"], formData["password"]) :
            await firebaseClientUtils.signIn(formData["email"], formData["password"]);

            if (signup) {
                await lightspeedClientUtils.createCustomer({
                    email: formData["email"],
                    password: formData["password"],
                    acceptMarketing: formData["marketing"]
                })
            }

            let body = new FormData();
            await fetch('/?/authenticate',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'idtoken': user["_tokenResponse"]["idToken"]
                },
                body
            });
            await location.reload();
        } catch (error) {
            if (error?.code === 'auth/user-not-found') {
                errors['email'] = "User not found.";
            } else if (error?.code === 'auth/wrong-password') {
                errors['password'] = "Wrong password."
            } else if (error?.code === 'auth/email-already-in-use') {
                errors['email'] = "Email already taken."
            }
        }

        loading = false;
    }
</script>

<Modal bind:visible>

    <form on:submit|preventDefault={onSubmit}>
        {#if $store?.logo}
            <img src={$store?.logo} loading="lazy" alt="company logo" style={`object-fit: contain;height: 5rem;`}/>
        {/if}

        <div class="w-full flex flex-col">
            <div class="w-full text-black flex-grow py-12 px-2 lg:px-6">
                <Input type="text" name="email" required error={errors["email"]}>Email</Input>
                <br/>
                <Input type="password" name="password" required error={errors["password"]}>Password</Input>
                {#if signup}
                    <small>Must be 6 characters long</small>
                    <br/>
                    <br/>
                    <Input type="password" name="passwordConfirm" required error={errors["passwordConfirm"]}>Confirm
                        Password</Input>
                    <br />
                    <div class="flex items-center">
                        <Input type="checkbox" name="marketing" />
                        <label class="ml-2 font-medium" for="marketing">Sign up for marketing/newsletter</label>
                    </div>
                {/if}
            </div>
            <div class="flex w-full items-stretch justify-center">
                <button type={"submit"}
                        on:click={(e) => {
                            if (!signup) {
                                signup = true;
                                e.preventDefault();
                                e.stopPropagation();
                                return;
                            }

                        }}
                        class={`mb-8 bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-cyan-700 text-white py-2 px-5`}
                        disabled={loading}>
                    Register
                </button>
                <button type="submit"
                        on:click={(e) => {
                            if (signup) {
                                signup = false;
                                e.preventDefault();
                                e.stopPropagation();
                                return;
                            }

                        }}
                        class={`ml-6 mb-8 bg-indigo-500 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-indigo-600 text-white py-2 px-5`}
                        disabled={loading}>
                    Login
                </button>
            </div>
        </div>

    </form>


</Modal>

<style lang="scss">
  form {
    @apply flex flex-col w-full items-center justify-center;
    max-width: 400px;
    min-width: 400px;

    @media screen and (max-width: 500px) {
      width: 90vw;
      min-width: unset;
    }
  }
</style>