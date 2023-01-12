<script lang="ts">
    import {cart, cartStore} from "$lib/stores/cart.js";
    import {lightspeedClientUtils} from "$lib/utils/lightspeed-utils";
    import ILSProduct from "$lib/interfaces/lightspeed/ILSProduct";
    import {onMount} from "svelte";

    export let visible: boolean = false;

    let productImages = {};

    cartStore.subscribe(async ({cart}) => {
        if (!cart?.items) return;
        let productsToFetch = [];
        cart.items.forEach((item) => {
            if (!productImages[item.product.id]) {
                productsToFetch.push(item.product.id);
            }
        })

        try {
            let products = await lightspeedClientUtils.getProducts(new URLSearchParams(`productId=${productsToFetch.join(",")}`));
            products.forEach((item: ILSProduct) => {
                productImages[item.id] = item.originalImage.url;
            })
            productImages = productImages;
        } catch (error) {
            console.error(error);
        }
    });

    async function removeFromCart(index: number) {
        await cart.removeProduct(index);
    }

    let canGoToCheckout = false;

    onMount(async () => {
        canGoToCheckout = await cart.canGotoCheckout();
    })

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    $: console.log($cartStore)
</script>

<div class="cart-drawer" class:visible>
    <header>
        <div class="flex items-center">
            <h1>Cart</h1>
            <h1 class="text-gray-300 ml-3">{$cartStore?.cart?.productsQuantity || 0}</h1>
        </div>
        <button type="button" on:click={() => visible = false}>
            <span class="material-symbols-outlined">close</span>
        </button>
    </header>

    <div class="items">
        {#each $cartStore?.cart?.items || [] as item, index}
            <div class="item">
                {#if productImages[item.product.id]}
                    <img src={productImages[item.product.id]} loading="lazy" alt={item.product.name + " image"}/>
                {:else}
                    <!--show stock photo-->
                    <span>IMG</span>
                {/if}
                <div class="flex flex-col mx-3">
                    <a href={"#"}>{item.product.name}</a>
                </div>

                <div class="flex h-full items-start justify-end">
                    <button type="button" on:click={() => removeFromCart(index)}><span class="material-symbols-outlined text-sm text-gray-500">close</span></button>
                </div>
            </div>
        {/each}
    </div>

    <footer>
        <div class="flex items-center justify-between mb-3">
            <span>Shipping</span>
            <span>{$cartStore?.shipping ? formatter.format($cartStore?.shipping) : "FREE"}</span>
        </div>
        <div class="flex items-center justify-between mb-5 font-bold">
            <span>Subtotal</span>
            <span>{formatter.format($cartStore?.subtotal || 0)}</span>
        </div>

        <button type="button" class="checkout-btn" disabled={!canGoToCheckout}>
            Checkout
        </button>

        <button type="button" class="mt-2 text-gray-500" on:click={() => visible = false}>Or continue shopping</button>
    </footer>
</div>

<style lang="scss">

  .checkout-btn {
    font-size: 15px;
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    display: inline-block;
    vertical-align: middle;
    padding: 0 25px;
    font-weight: 600;
    line-height: 52px;
    height: 52px;
    max-height: none;
    min-height: 0;
    transition: 0.2s opacity, 0.2s background-color, 0.2s color;
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    cursor: pointer;

    &:hover,&:disabled {
      background-color: rgb(48, 48, 48);
    }
  }

  .cart-drawer {
    @apply fixed top-0 right-0 h-screen max-h-full bg-white overflow-hidden flex flex-col;
    width: 400px;
    z-index: 4000;
    margin-right: -500px;
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

    &.visible {
      margin-right: 0;
    }

    header {
      @apply w-full flex items-center justify-between sticky top-0 left-0 flex-shrink border-b border-solid border-gray-200;
      padding: 30px;

      h1 {
        font-size: 22px;
      }

      button {
        @apply text-gray-400;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.05);
        transition: 0.2s background-color;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;

        span {
          font-size: 20px;
        }

        &:hover {
          background: rgba(0, 0, 0, 0.1);

          span {
            @apply text-black;
          }
        }
      }
    }

    @media screen and (max-width: 500px) {
      width: 100vw;
      margin-right: -100vw;
    }

    .items {
      @apply flex flex-col flex-grow overflow-x-hidden overflow-y-auto;
    }

    .item {
      padding: 30px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: grid;
      grid-template-columns: 0.25fr 1fr 0.1fr;
      width: 100%;

      a {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  footer {
    @apply flex flex-col w-full flex-shrink;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 20px 30px;
  }
</style>