<script lang="ts">
    import {page} from "$app/stores";
    import {firebaseClientUtils} from "$lib/utils/firebase/firebase-client-utils";
    import {authStore} from "$lib/stores/auth";
    import {goto} from "$app/navigation";
    import {cookies} from "$lib/stores/cookies";

    export let data;

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
        window.location.href = "/"
    }

    if (data["cookies"]) {
        $cookies = {...$cookies, ...data["cookies"]};
    }
</script>

<section>
    <div class="navigation">
        <a href="/admin" class:active={$page.url.pathname === "/admin"}>
            <span class="material-symbols-outlined mr-2">support</span>
            Support Tickets
        </a>
        <hr/>
        <a href="/admin/pact-act-forms" class:active={$page.url.pathname.includes("/admin/pact-act-forms")}>
            <span class="material-symbols-outlined mr-2">description</span>
            Pact Act Forms
        </a>
        <hr/>
        {#if $cookies.staff || $cookies.admin}
            <a href="/admin/reps" class:active={$page.url.pathname.includes("/admin/reps")}>
                <span class="material-symbols-outlined mr-2">supervisor_account</span>
                Sales Reps
            </a>
            <hr/>
        {/if}
        {#if $cookies.admin}
            <a href="/admin/staff" class:active={$page.url.pathname.includes("/admin/staff")}>
                <span class="material-symbols-outlined mr-2">badge</span>
                Staff
            </a>
            <hr/>
            <a href="/admin/admins" class:active={$page.url.pathname.includes("/admin/admins")}>
                <span class="material-symbols-outlined mr-2">admin_panel_settings</span>
                Admins
            </a>
            <hr/>
        {/if}
        <button on:click={logout} class="text-red-500">
            <span class="material-symbols-outlined mr-2">logout</span>
            Sign out
        </button>
        <hr />
        <div class="p-2">
            {#if $cookies.admin}
                <span class="font-medium text-orange-500">Admin</span>
            {:else if $cookies.staff}
                <span class="font-medium text-indigo-500">Staff</span>
            {:else if $cookies.salesRep}
                <span class="font-medium text-blue-500">Sales Rep</span>
            {/if}
        </div>

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