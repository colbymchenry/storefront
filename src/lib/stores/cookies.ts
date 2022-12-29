import {type Writable, writable} from 'svelte/store';
import type ICookie from "../interfaces/ICookie";

export const project_id = typeof document !== 'undefined' ? JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG)?.projectId : JSON.parse(process.env.FIREBASE_CONFIG)?.project_id;

export const cookies: Writable<ICookie> = writable({
    is18: false,
    authenticated: false,
    idToken: undefined,
    categories: undefined
});