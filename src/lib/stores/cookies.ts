import {type Writable, writable} from 'svelte/store';
import type ICookie from "../interfaces/ICookie";

export const cookies: Writable<ICookie> = writable({
    is18: false,
    authenticated: false,
    idToken: undefined,
    categories: undefined
});