<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {store} from "$lib/stores/store";
    import {schema} from "./schema";

    let inputLogo;
</script>

<nav>
    <Component {schema} let:props>
        <div class={`flex w-full h-full p-4 bg-${props?.navBgColor ||  $store?.primaryColor  || 'slate-800'}`}>
            {#if inputLogo?.src || props?.logo}
                <img src={inputLogo?.src || props.logo} loading="lazy" alt="company logo"/>
            {:else}
                {#if $store?.storeName}
                    <h1>{$store.storeName}</h1>
                {/if}
            {/if}

            <div style="width: 400px;" class={`flex items-center pl-4 pr-2 py-2
        bg-${props?.searchBgColor || 'gray-300'}
        text-${props?.searchTextColor || 'gray-800'} placeholder-${props?.searchTextColor || 'gray-800'}`}>
                <input type="text" placeholder="Search" class="outline-none flex-grow" style="background: none;"/>
                <span class="material-symbols-outlined">search</span>
            </div>
        </div>
    </Component>
</nav>


<style lang="scss">
  nav {
    @apply sticky top-0 left-0 w-screen h-20 flex;
  }
</style>