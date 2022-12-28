<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {store} from "$lib/stores/store";
    import {schema} from "./schema";
    import {cookies} from "$lib/stores/cookies";

    function innerWidth(node) {
        let rect = node.getBoundingClientRect();
        let parentRect = node.parentNode.getBoundingClientRect();

        node.style.width = (rect.innerWidth + 20) + 'px';
        node.style.left = parentRect.left + 'px';
        node.style.top = parentRect.bottom + 'px';
    }

    function flexCol(node) {
        node.parentNode.style.flexDirection = 'column';
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

                <!-- Search Bar -->
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

            <!-- Desktop Navbar -->
            <div class={`hidden md:flex w-full items-stretch items-center h-10 bg-${props.navbarBgColor} text-${props.navbarTextColor} px-4 overflow-auto`}>
                {#each $cookies.categories.items as category}
                    {#if !category.parentId}
                        <a href={`/collections?id=${category.id}`}
                           class={`flex items-center px-4 relative whitespace-nowrap url transition hover:text-${props.navbarHoverTextColor}`}>
                            {category.name}

                            {#if $cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                                <div use:innerWidth
                                     class={`bg-${props.navbarHoverMenuBgColor} text-${props.navbarHoverMenuTextColor} url-container`}>
                                    {#each $cookies.categories.items.filter((cat) => cat.parentId === category.id) as cat}
                                        {#if $cookies.categories.items.filter((c) => c.parentId === cat.id).length}
                                            <div class="relative flex flex-col min-w-10 mx-4">
                                                <strong>{cat.name}</strong>
                                                <div class={`mb-2 h-1 bg-${props.navbarHoverTextColor}`}></div>
                                                {#each $cookies.categories.items.filter((c) => c.parentId === cat.id) as c}
                                                    <a href={`/collections?id=${c.id}`}
                                                       class={`relative whitespace-nowrap transition my-1 hover:text-${props.navbarHoverMenuHoverTextColor}`}>{c.name}</a>
                                                {/each}
                                            </div>
                                        {:else}
                                            <a use:flexCol href={`/collections?id=${cat.id}`}
                                               class={`relative whitespace-nowrap transition my-1 hover:text-${props.navbarHoverMenuHoverTextColor}`}>{cat.name}</a>
                                        {/if}
                                    {/each}
                                </div>

                                <span class="material-symbols-outlined h-5 ml-2">expand_more</span>
                            {/if}
                        </a>
                    {/if}
                {/each}
            </div>

            <!-- Mobile searchbar  -->
            <!-- Search Bar -->
            <div class={`w-full items-center pl-4 pr-2 py-3 flex-grow md:hidden flex
                bg-${props?.searchBgColor} text-${props?.searchTextColor} ${props?.searchTextColor}`}>
                <input type="text" placeholder="Search entire store..." class="outline-none flex-grow"
                       style="background: none;"/>
                <span class="material-symbols-outlined">search</span>
            </div>
        </div>
    </Component>
</nav>


<style lang="scss">
  nav {
    @apply sticky top-0 left-0 w-screen flex;
  }

  .url {
    > .url-container {
      @apply opacity-0 pointer-events-none transition fixed flex p-4 opacity-0;
    }

    &:hover > .url-container {
      @apply opacity-100 pointer-events-auto;
    }
  }
</style>