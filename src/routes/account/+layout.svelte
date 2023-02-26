<script lang="ts">
    import {page} from "$app/stores";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {authStore} from "$lib/stores/auth";
    import {goto} from "$app/navigation";
    import {cookies} from "$lib/stores/cookies";

    export let data;

    let emailSent = false;

    async function logout() {
        await firebaseClientUtils.signOut();
        $authStore = undefined;
        let body = new FormData();
        await fetch('/?/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body
        });
        await goto('/')
    }

    async function sendVerificationEmail() {
        if (emailSent) return;
        await firebaseClientUtils.sendVerificationEmail($authStore);
        emailSent = true;
    }

    if (data["cookies"]) {
        $cookies = {...$cookies, ...data["cookies"]};
    }
</script>

{#if !$cookies.email_verified}
    <div class="flex flex-col justify-center items-center w-full mt-12">
        <h1 class="text-3xl font-medium mb-6">Verify Email</h1>
        <button type="button" class:emailSent on:click={sendVerificationEmail} class="verifyBtn">
            {emailSent ? "Email Sent!" : "Resend Verification Email"}
            <span>
                <span class="material-symbols-outlined">send</span>
            </span>
        </button>
    </div>
{:else}

    <section>
        <div class="navigation">
            <a href="/account" class:active={$page.url.pathname === "/account"}>
                <span class="material-symbols-outlined mr-2">speed</span>
                Dashboard
            </a>
            <hr/>
            <a href="/account/stores" class:active={$page.url.pathname.includes("/account/stores")}>
                <span class="material-symbols-outlined mr-2">store</span>
                Stores
            </a>
            <hr/>
            <a href="/account/profile" class:active={$page.url.pathname.includes("/account/profile")}>
                <span class="material-symbols-outlined mr-2">person</span>
                Profile
            </a>
            <hr/>
            <a href="/account/support" class:active={$page.url.pathname.includes("/account/support")}>
                <span class="material-symbols-outlined mr-2">support</span>
                Support
            </a>
            <hr/>
            <a href="/account/pact-act-form" class:active={$page.url.pathname.includes("/account/pact-act-form")}>
                <span class="material-symbols-outlined mr-2">description</span>
                New Pact Act Form
            </a>
            <hr/>
            <button on:click={logout} class="text-red-500">
                <span class="material-symbols-outlined mr-2">logout</span>
                Sign out
            </button>
        </div>
        <div class="content">
            <slot/>
        </div>
    </section>
{/if}

<style lang="scss">
  section {
    @apply w-full grid m-4 p-4 relative max-h-fit overflow-auto;
    grid-template-columns: 250px 1fr;

    @media screen and (max-width: 740px) {
      @apply m-0;
      grid-template-columns: 1fr;
      > div:first-of-type {
        @apply hidden;
      }

      .content {
        @apply ml-0 px-2;
      }
    }
  }

  .navigation {
    @apply sticky top-0 left-0 flex flex-col w-full shadow-md rounded-lg border border-solid border-gray-200 px-3 py-1 self-start;

    a, button {
      @apply flex items-center font-medium my-2 p-2 cursor-pointer rounded-lg transition;

      &:hover, &.active {
        @apply bg-gray-200;
      }

      &:first-of-type {
        @apply border-none;
      }

    }
  }

  .content {
    @apply ml-6 px-6;
  }

  .verifyBtn {
    @apply bg-gray-100 text-black px-3 py-2 text-2xl border-solid border-gray-300 border-2 rounded-lg hover:bg-black hover:text-white flex items-center;
    transition: all 0.2s ease;

    > span {
      @apply overflow-hidden max-w-0;
      transition: all 0.2s ease;
    }

    &:hover > span {
      max-width: 3rem;
    }

    > span > span {
      @apply text-3xl ml-3;
    }

    &.emailSent > span {
      @apply max-w-0;
    }

    &.emailSent {
      @apply bg-green-500 text-white border-green-700;
    }
  }


</style>