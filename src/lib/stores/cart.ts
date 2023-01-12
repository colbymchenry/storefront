import {writable} from "svelte/store";
import type ICartStore from "../interfaces/ICartStore";
import {lightspeedClientUtils} from "../utils/lightspeed-utils";

export const cartStore = writable<ICartStore>();

function createCart() {
    const {set, update, subscribe} = cartStore;

    async function addProduct(productId: number): Promise<ICartStore> {
        if (!lightspeedClientUtils.ecwid().Cart) return;
        await lightspeedClientUtils.ecwid().Cart.addProduct(productId);
    }

    async function removeProduct(productIndex: number): Promise<ICartStore> {
        if (!lightspeedClientUtils.ecwid().Cart) return;
        await lightspeedClientUtils.ecwid().Cart.removeProduct(productIndex);
    }

    async function canGotoCheckout() {
        if (!lightspeedClientUtils.ecwid().Cart) return false;
        return await lightspeedClientUtils.ecwid().Cart.canGotoCheckout();
    }

    async function gotoCheckout(path?: string) {
        await lightspeedClientUtils.sdk.cart.goToCheckout(path);
    }

    return {
        subscribe, addProduct, removeProduct, set, update, gotoCheckout, canGotoCheckout
    }
}

export const cart = createCart();
