<script lang="ts">

import {page} from "$app/stores";
</script>

<section>
    <div class="navigation">
        <a href="/account" class:active={$page.url.pathname === "/account"}>
            <span class="material-symbols-outlined mr-2">speed</span>
            Dashboard
        </a>
        <hr />
        <a href="/account/stores" class:active={$page.url.pathname === "/account/stores"}>
            <span class="material-symbols-outlined mr-2">store</span>
            Stores
        </a>
        <hr />
        <a href="/account/profile" class:active={$page.url.pathname === "/account/profile"}>
            <span class="material-symbols-outlined mr-2">person</span>
            Profile
        </a>
        <hr />
        <a href="/account/pact-act-form" class:active={$page.url.pathname === "/account/pact-act-form"}>
            <span class="material-symbols-outlined mr-2">description</span>
            Pact Act Form
        </a>
    </div>
    <div class="content">
        <slot />
    </div>
</section>

<style lang="scss">
    section {
      @apply w-full grid m-4 p-4;
      grid-template-columns: 200px 1fr;
    }

    .navigation {
      @apply flex flex-col w-full shadow-md rounded-lg border border-solid border-gray-200 px-3 py-1;

      a {
        @apply flex items-center font-medium my-2 p-2 cursor-pointer rounded-lg transition;

        &:hover,&.active {
          @apply bg-gray-200;
        }

        &:first-of-type {
          @apply border-none;
        }

      }
    }

    .content {
      @apply ml-6;
    }
</style>