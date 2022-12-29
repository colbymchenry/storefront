<script lang="ts">
    import Component from "$lib/components/component/Component.svelte";
    import {store} from "$lib/stores/store";
    import {schema} from "./schema";
    import {cookies} from "$lib/stores/cookies";
    import {goto} from "$app/navigation";

    let mobileNavContainer: HTMLElement;
    let mobileMenuButton: HTMLElement;

    function innerWidth(e) {
        let node = e.target.querySelector("DIV");
        if (!node) return;

        let rect = node.getBoundingClientRect();
        let parentRect = e.target.getBoundingClientRect();

        node.style.width = (rect.innerWidth + 20) + 'px';
        node.style.left = parentRect.left + 'px';
        node.style.top = parentRect.bottom + 'px';
    }

    function flexCol(node) {
        node.parentNode.style.flexDirection = 'column';
    }

    function handleWindowClick(e) {
        if (showMobileNav && mobileNavContainer && !mobileNavContainer.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            showMobileNav = false;
        }
    }

    let showMobileNav: boolean = false;
    let expanded: any;
</script>

<svelte:window on:click={handleWindowClick} />

<nav>
    <Component {schema} let:props>
        <div class={`flex flex-col w-full ${props.dropShadow}`}>
            <div class={`flex items-center justify-between w-full relative bg-${props.bgColor} gap-2 md:gap-5 px-4 md:px-6 h-20`}>
                <button bind:this={mobileMenuButton} type="button" class="z-20 items-center flex lg:hidden"
                        on:click={() => showMobileNav = !showMobileNav}>
                    <span class={`material-symbols-outlined ${showMobileNav ? `text-${props.navbarTextColor}` : ''}`}
                          style="font-size: 2.5rem;">
                        {#if showMobileNav}
                            close
                        {:else}
                            menu
                        {/if}
                    </span>
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
                <div style="width: 400px;" class={`items-center pl-4 pr-2 py-2 flex-grow hidden lg:flex
                bg-${props?.searchBgColor} text-${props?.searchTextColor} ${props?.searchTextColor}`}>
                    <input type="text" placeholder="Search entire store..." class="outline-none flex-grow"
                           style="background: none;"/>
                    <span class="material-symbols-outlined">search</span>
                </div>

                <div class="flex">
                    {#if $store?.businessPhone}
                        <a href={`tel:${$store.businessPhone}`} class="flex items-center hidden sm:flex mr-3">
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
            <div class={`hidden lg:flex w-full items-stretch items-center h-10 bg-${props.navbarBgColor} text-${props.navbarTextColor} px-4 overflow-auto`}>
                {#each $cookies.categories.items as category}
                    {#if !category.parentId}
                        <a href={`/collections?id=${category.id}`} on:mouseenter={innerWidth}
                           class={`flex items-center px-4 relative whitespace-nowrap url transition hover:text-${props.navbarHoverTextColor}`}>
                            {category.name}

                            {#if $cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                                <div class={`bg-${props.navbarHoverMenuBgColor} text-${props.navbarHoverMenuTextColor} url-container opacity-0`}>
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
            <div class={`w-full items-center pl-4 pr-2 py-3 flex-grow lg:hidden flex
                bg-${props?.searchBgColor} text-${props?.searchTextColor} ${props?.searchTextColor}`}>
                <input type="text" placeholder="Search entire store..." class="outline-none flex-grow"
                       style="background: none;"/>
                <span class="material-symbols-outlined">search</span>
            </div>

            <div class={`mobileNav`} class:hide={!showMobileNav}>
                <div bind:this={mobileNavContainer} class={`mobileNav__container bg-${props.navbarBgColor} text-${props.navbarTextColor}`}>
                    {#each $cookies.categories.items as category}
                        {#if !category.parentId}
                            <button on:click={async (e) => {
                                if ($cookies.categories.items.filter((cat) => cat.parentId === category.id).length) {
                                    let isExpanded = expanded === category;
                                    let div = e.target.querySelector("DIV");
                                    let rect = div.querySelector("DIV").getBoundingClientRect();

                                    if (isExpanded) {
                                        expanded = undefined;
                                        div.style.maxHeight = '0';
                                    } else {
                                        expanded = category;
                                        div.style.maxHeight = rect.height + 'px';
                                    }

                                } else {
                                    await goto(`/collections?id=${category.id}`);
                                }
                            }} class={`text-md url hover:text-${props.navbarHoverTextColor}`}>
                                {category.name}

                                <div class="flex flex-col" on:click={(e) => e.stopPropagation()} class:closed={expanded !== category}>
                                    <div class={`flex flex-col gap-4 items-start mx-2 px-4 pb-4 mt-4 border-l border-solid border-${props.navbarHoverTextColor}`}>
                                        {#each $cookies.categories.items.filter((cat) => cat.parentId === category.id) as cat}
                                            {#if $cookies.categories.items.filter((c) => c.parentId === cat.id).length}
                                                <div class={`text-sm relative flex flex-col min-w-10 items-start`}>
                                                    <strong class={`text-${props.navbarTextColor}`}>{cat.name}</strong>
                                                    <div class={`mb-2 h-1 w-full bg-${props.navbarHoverTextColor}`}></div>
                                                    {#each $cookies.categories.items.filter((c) => c.parentId === cat.id) as c}
                                                        <a href={`/collections?id=${c.id}`}
                                                           class={`relative whitespace-nowrap transition my-1 text-${props.navbarTextColor} hover:text-${props.navbarHoverMenuHoverTextColor}`}>{c.name}</a>
                                                    {/each}
                                                </div>
                                            {:else}
                                                <a href={`/collections?id=${cat.id}`}
                                                   class={`relative whitespace-nowrap transition text-${props.navbarTextColor} hover:text-${props.navbarHoverMenuHoverTextColor}`}>{cat.name}</a>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>

                                {#if $cookies.categories.items.filter((cat) => cat.parentId === category.id).length}
                                    <span class="material-symbols-outlined ml-2 expand-icon mb-2 transition" style={expanded === category ? "transform: rotate(180deg);" : ""}>expand_more</span>
                                {/if}
                            </button>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </Component>
</nav>


<style lang="scss">
  .closed {
    max-height: 0 !important;
  }

  nav {
    @apply sticky top-0 left-0 w-screen flex z-50;
  }

  .url {
    > .url-container {
      @apply transition fixed flex p-4 opacity-0 pointer-events-none;
    }

    &:hover > .url-container {
      @apply opacity-100 pointer-events-auto;
    }
  }

  .mobileNav {
    @apply fixed top-0 left-0 w-screen h-screen flex-col lg:hidden flex backdrop-blur-sm transition;

    &::before {
      @apply top-0 left-0 w-screen h-screen bg-white opacity-75 lg:hidden flex transition absolute;
      content: '';
    }

    &.hide {
      @apply backdrop-blur-none pointer-events-none;
      &::before {
        @apply opacity-0 transition;
      }
    }

    .expanded {

    }
  }

  .hide .mobileNav__container {
    margin-left: -600px;
  }

  .mobileNav__container {
    @apply top-0 left-0 flex flex-col h-full z-10 py-20 pl-4 overflow-y-auto;
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    width: clamp(300px, 100vw, 500px);
    max-width: 500px;
    margin-left: 0;

    button {
      @apply my-2 flex flex-col px-4 relative whitespace-nowrap transition relative;

      > div:first-of-type {
        @apply overflow-hidden;
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
        max-height: 0;
      }
    }

    .expand-icon {
      @apply absolute right-6;
    }
  }
</style>