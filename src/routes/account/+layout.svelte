<script lang="ts">
    import {page} from "$app/stores";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {authStore} from "$lib/stores/auth";
    import {goto} from "$app/navigation";
    import {cookies} from "$lib/stores/cookies";
    import {browser} from "$app/environment";

    async function logout() {
        await firebaseClientUtils.signOut();
        $authStore = undefined;
        let body = new FormData();
        await fetch('/?/logout',{
            method:'POST',
            headers: {
                'Accept': 'application/json'
            },
            body
        });
        await goto('/')
    }
</script>

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
        <a href="/account/pact-act-form" class:active={$page.url.pathname.includes("/account/pact-act-form")}>
            <span class="material-symbols-outlined mr-2">description</span>
            Pact Act Form
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

<style lang="scss">
  section {
    @apply w-full grid m-4 p-4;
    grid-template-columns: 200px 1fr;
  }

  .navigation {
    @apply flex flex-col w-full shadow-md rounded-lg border border-solid border-gray-200 px-3 py-1 self-start;

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
</style>