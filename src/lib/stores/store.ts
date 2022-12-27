import {type Writable, writable} from 'svelte/store';

export interface IStore {
    storeName?: string | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
}
export const store: Writable<IStore> = writable<IStore>({});