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
        <a href="/admin" class:active={$page.url.pathname === "/admin"}>
            <span class="material-symbols-outlined mr-2">support</span>
            Disputes
        </a>
        <hr/>
        <a href="/admin/pact-act-forms" class:active={$page.url.pathname.includes("/admin/pact-act-forms")}>
            <span class="material-symbols-outlined mr-2">description</span>
            Pact Act Forms
        </a>
        <hr/>
        <a href="/account">
            <span class="material-symbols-outlined mr-2">person</span>
            Customer Dashboard
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


</style>