<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";
    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import {activeModal} from "$lib/stores/modals";
    import Swal from "sweetalert2";
    import {invalidateAll} from "$app/navigation";

    export let visible = true;

    let loading = false;
    let error = undefined;
    let errors = {};

    async function onSubmit(e) {
        if (loading) return;

        let formData = formHelper.getFormData(e.target);

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

        loading = true;

        try {
            let user = await firebaseClientUtils.createUser(formData["email"], formData["password"]);

            await lightspeedClientUtils.createStaff(user.user.uid)
            await firebaseClientUtils.sendVerificationEmail(user.user);

            Swal.fire({
                title: 'Staff created!',
                text: 'Verification email sent to ' + formData["email"],
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(async () => {
                $activeModal = undefined;
                await invalidateAll();
                window.location.reload()
            })
        } catch (error) {
            if (error?.code === 'auth/user-not-found') {
                errors['email'] = "User not found.";
            } else if (error?.code === 'auth/wrong-password') {
                errors['password'] = "Wrong password."
            } else if (error?.code === 'auth/email-already-in-use') {
                errors['email'] = "Email already taken."
            } else {
                Swal.fire({
                    title: 'Staff failed!',
                    text: 'An error occurred. Please check the console.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
            console.error(error);
        }

        loading = false;
    }
</script>

<Modal bind:visible>
    <h2 class="font-medium text-lg" slot="title">Create Staff</h2>

    <form on:submit|preventDefault={onSubmit}>
        <div class="w-full flex flex-col">
            <div class="w-full text-black flex-grow py-12 px-2 lg:px-6">
                <Input type="text" name="email" required error={errors["email"]}>Email</Input>
                <br/>
                <Input type="password" name="password" required error={errors["password"]}>Password</Input>
                <small>Must be 6 characters long</small>
                <br/>
                <br/>
                <Input type="password" name="passwordConfirm" required error={errors["passwordConfirm"]}>Confirm
                    Password</Input>
                <br/>
            </div>
            <div class="flex w-full items-stretch justify-center">
                <button type={"submit"}
                        class={`mb-8 bg-cyan-600 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-cyan-700 text-white py-2 px-5`}
                        disabled={loading}>
                    Create Staff
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