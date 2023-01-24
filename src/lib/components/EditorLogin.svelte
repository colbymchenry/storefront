<script lang="ts">
    import {store} from "$lib/stores/store.js";
    import Input from "$lib/components/component/Input.svelte";
    import {formHelper} from "$lib/utils/form-helper";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import { goto } from '$app/navigation';

    let error: string | undefined = undefined;
    let loading: boolean = false;

    async function onSubmit(e) {
        if (loading) return;
        loading = true;
        let formData = formHelper.getFormData(e.target);
        try {
            let user = await firebaseClientUtils.signIn(formData['email'], formData['password']);
            let body = new FormData();
            body.set("idToken", user["_tokenResponse"]["idToken"]);
            await fetch('/?/authenticate',{
                method:'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body
            });
            await location.reload();
        } catch (e) {
            if (e?.code === 'auth/user-not-found') {
                error = "User not found.";
            } else if (e?.code === 'auth/wrong-password') {
                error = "Wrong password."
            } else {
                error = e?.message ? e.message.toLowerCase().replace(/_/g, ' ') : "Make sure Firebase configuration is set.";
            }
        }
        loading = false;
    }
</script>

<div class="container">
    <form class="flex flex-col parent bg-white" on:submit|preventDefault={onSubmit}>
        <div class={`w-full p-3 text-center bg-indigo-500`}>
            <h1 class={`text-white`}>Editor Login</h1>
        </div>

        {#if $store?.logo}
            <img src={$store?.logo} loading="lazy" alt="company logo" style={`object-fit: contain;`}/>
        {/if}

        <div class="w-full flex flex-col">
            <div class="w-full text-black flex-grow py-12 px-6">
                <Input type="text" name="email" required>Email</Input>
                <br/>
                <Input type="password" name="password" required>Password</Input>
                {#if error}
                    <span class="text-red-500 font-medium">{error}</span>
                {/if}
            </div>
            <button type="submit" class={`mb-8 bg-indigo-500 disabled:bg-indigo-300 text-white py-2 px-5`} style="align-self: center;" disabled={loading}>
                {#if loading} Please wait {:else} ENTER {/if}
            </button>
        </div>

    </form>
</div>

<style lang="scss">
  .container {
    @apply fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black;
    max-width: none !important;

    > form {
      @apply flex flex-col;
      max-width: 400px;
      min-width: 400px;
    }
  }

  .parent {
    max-width: 400px;
  }
</style>