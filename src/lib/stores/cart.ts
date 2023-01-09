import {writable} from "svelte/store";
import type ICartStore from "../interfaces/ICartStore";
import type ILSProduct from "../interfaces/lightspeed/ILSProduct";

function createCart() {
    const store = writable<ICartStore>({
        items: []
    })

    const {set, update, subscribe} = store;

    function addItem(item: ILSProduct) {
        update((conf) => {
            return {
                items: [...conf.items, item]
            }
        })
    }

    function removeItem(item: ILSProduct) {
        update((conf) => {
            return {
                items: conf.items.filter((i) => i !== item)
            }
        })
    }

    return {
        subscribe, addItem, removeItem
    }
}

export const cart = createCart();
