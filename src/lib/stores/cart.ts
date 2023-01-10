import {writable} from "svelte/store";
import type ICartStore from "../interfaces/ICartStore";
import type ILSProduct from "../interfaces/lightspeed/ILSProduct";
import {lightspeedClientUtils} from "../utils/lightspeed-utils";

export const cartStore = writable<ICartStore>();

if (typeof window !== 'undefined') {
    setTimeout(() => {
        cart.getCart();
    }, 500);
}

function createCart() {
    const {set, update, subscribe} = cartStore;

    async function addProduct(product: ILSProduct): Promise<ICartStore> {
        await lightspeedClientUtils.ecwid().Cart.addProduct(product.id);
        return await getCart();
    }

    async function removeProduct(product: ILSProduct): Promise<ICartStore> {
        await lightspeedClientUtils.ecwid().Cart.removeProduct(product.id);
        return await getCart();
    }

    async function getCart() {
        let o;

        await lightspeedClientUtils.ecwid().Cart.calculateTotal((order: any) => {
            update((conf) => order);
            o = order;
        });
        return o;
    }

    async function gotoCheckout(path?: string) {
        await lightspeedClientUtils.sdk.cart.goToCheckout(path);
    }

    return {
        subscribe, addProduct, removeProduct, set, update, getCart, gotoCheckout
    }
}

export const cart = createCart();
