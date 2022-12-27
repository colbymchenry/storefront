<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {store} from "$lib/stores/store";
    import {schema} from "./schema";
</script>

<nav>
    <Component {schema} let:props>
        <div class={`flex items-center justify-between w-full h-full relative bg-${props?.bgColor} ${props?.dropShadow}
        gap-2 md:gap-5 px-4 md:px-6`}>
            <button type="button" class="flex items-center">
                <span class="material-symbols-outlined" style="font-size: 2.5rem;">menu</span>
            </button>

            {#if props?.logo || $store?.logo}
                <img src={props?.logo || $store?.logo} loading="lazy" alt="company logo"
                     style={`max-height: 100%;object-fit: contain;height: ${props.logoHeight}%;`}/>
            {:else}
                {#if $store?.businessName}
                    <h1>{$store.businessName}</h1>
                {/if}
            {/if}

            <div style="width: 400px;" class={`items-center pl-4 pr-2 py-2 flex-grow hidden md:flex
                bg-${props?.searchBgColor} text-${props?.searchTextColor} ${props?.searchTextColor}`}>
                <input type="text" placeholder="Search" class="outline-none flex-grow" style="background: none;"/>
                <span class="material-symbols-outlined">search</span>
            </div>

            <div class="flex">
                {#if $store?.businessPhone}
                    <a href={`tel:${$store.businessPhone}`} class="flex items-center hidden md:flex mr-3">
                        <span class={`material-symbols-outlined text-${props?.textColor} mr-3`}
                              style="font-size: 2.5rem;">phone_in_talk</span>
                        <div class="flex-col hidden lg:flex">
                            <span>Have Questions?</span>
                            <span>{$store.businessPhone}</span>
                        </div>
                    </a>
                {/if}

                <button type="button" class="flex items-center">
                    <span class="material-symbols-outlined" style="font-size: 2.5rem;">shopping_basket</span>
                </button>
            </div>

        </div>
    </Component>
</nav>


<style lang="scss">
  nav {
    @apply sticky top-0 left-0 w-screen h-20 flex;
  }
</style>