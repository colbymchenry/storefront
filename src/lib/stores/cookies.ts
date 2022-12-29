import {type Writable, writable} from 'svelte/store';
import type ICookie from "../interfaces/ICookie";

export const {project_id} = JSON.parse(process.env.FIREBASE_CONFIG);

export const cookies: Writable<ICookie> = writable({
    is18: false,
    authenticated: false,
    idToken: undefined,
    categories: undefined
});