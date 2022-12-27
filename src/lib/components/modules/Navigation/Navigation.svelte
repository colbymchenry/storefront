<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {store} from "$lib/stores/store";
    import {schema} from "./schema";
</script>

<nav>
    <Component {schema} let:props>
        <div class={`flex items-center w-full h-full p-4 relative bg-${props?.bgColor} ${props?.dropShadow}`}>
            {#if props?.logo || $store?.logo}
                <img src={props?.logo || $store?.logo} loading="lazy" alt="company logo"
                     style="max-height: 100%;object-fit: contain;"/>
            {:else}
                {#if $store?.businessName}
                    <h1>{$store.businessName}</h1>
                {/if}
            {/if}

            <div style="width: 400px;" class={`flex items-center pl-4 pr-2 py-2 ml-12 flex-grow
                bg-${props?.searchBgColor} text-${props?.searchTextColor} ${props?.searchTextColor}`}>
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