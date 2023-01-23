import {get, writable} from "svelte/store";
import type ICartStore from "../interfaces/ICartStore";
import {lightspeedClientUtils} from "../utils/lightspeed-utils";
import {page} from "$app/stores";

export const cartStore = writable<ICartStore>();

function createCart() {
    const {set, update, subscribe} = cartStore;

    async function addProduct(productId: number, productObj?: any) {
        if (!lightspeedClientUtils.ecwid().Cart) return;
        return await lightspeedClientUtils.ecwid().Cart.addProduct(productObj || productId);
    }

    async function removeProduct(productIndex: number) {
        if (!lightspeedClientUtils.ecwid().Cart) return;
        return await lightspeedClientUtils.ecwid().Cart.removeProduct(productIndex);
    }

    async function canGotoCheckout() {
        if (!lightspeedClientUtils.ecwid().Cart) return false;
        return await lightspeedClientUtils.ecwid().Cart.canGotoCheckout();
    }

    async function gotoCheckout(path?: string) {
        let p = get(page);
        await lightspeedClientUtils.sdk.cart.goToCheckout(path || p.url.pathname);
    }

    return {
        subscribe, addProduct, removeProduct, set, update, gotoCheckout, canGotoCheckout
    }
}

export const cart = createCart();
