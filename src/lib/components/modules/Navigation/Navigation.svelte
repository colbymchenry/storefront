<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {store} from "$lib/stores/store";
    import {schema} from "./schema";
    import {cookies} from "$lib/stores/cookies";

    const categories = () => {
        let object = [];
    }

    function innerWidth(node) {
        let rect = node.getBoundingClientRect();
        node.style.width = (rect.innerWidth + 20) + 'px';
    }
</script>

<nav>
    <Component {schema} let:props>
        <div class={`flex flex-col w-full ${props.dropShadow}`}>
            <div class={`flex items-center justify-between w-full relative bg-${props.bgColor} gap-2 md:gap-5 px-4 md:px-6 h-20`}>
                <button type="button" class="items-center flex md:hidden">
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
                    <input type="text" placeholder="Search entire store..." class="outline-none flex-grow"
                           style="background: none;"/>
                    <span class="material-symbols-outlined">search</span>
                </div>

                <div class="flex">
                    {#if $store?.businessPhone}
                        <a href={`tel:${$store.businessPhone}`} class="flex items-center hidden md:flex mr-3">
                        <span class={`material-symbols-outlined text-${props.textColor} mr-3`}
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

            <div class={`flex w-full items-stretch items-center h-10 bg-${props.navbarBgColor} text-${props.navbarTextColor} px-4`}>
                {#each $cookies.categories.items as category}
                    {#if !category.parentId}
                        <a href={`/collections?id=${category.id}`}
                           class={`flex items-center px-4 relative whitespace-nowrap url transition hover:text-${props.navbarHoverTextColor}`}>
                            {category.name}

                            {#if $cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                                <div use:innerWidth
                                     class={`absolute left-0 bottom-0 flex flex-col bg-${props.navbarHoverMenuBgColor} text-${props.navbarHoverMenuTextColor} px-4 opacity-0`}>
                                    {#each $cookies.categories.items.filter((cat) => cat.parentId === category.id) as cat}
                                        <a href={`/collections?id=${cat.id}`}
                                           class={`relative whitespace-nowrap transition hover:text-${props.navbarHoverMenuHoverTextColor}`}>{cat.name}</a>
                                    {/each}
                                </div>

                                <span class="material-symbols-outlined h-5 ml-2">expand_more</span>
                            {/if}
                        </a>
                    {/if}
                {/each}
            </div>
        </div>
    </Component>
</nav>


<style lang="scss">
  nav {
    @apply sticky top-0 left-0 w-screen flex;
  }

  .url {
    > div {
      @apply opacity-0 pointer-events-none transition;
      margin-bottom: -1.5rem;
    }

    &:hover > div {
      @apply opacity-100 pointer-events-auto;
    }
  }
</style>