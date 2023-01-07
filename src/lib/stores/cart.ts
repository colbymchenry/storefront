import {writable, type Writable} from "svelte/store";

export interface ICartStore {

}

export const cookies: Writable<ICartStore> = writable({
    is18: false,
    authenticated: false,
    idToken: undefined,
    categories: undefined
});