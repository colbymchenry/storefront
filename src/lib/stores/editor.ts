import { writable } from 'svelte/store';

export interface IEditor {
    enabled: boolean;
    device: 'desktop' | 'tablet' | 'mobile';
}

export const editor = writable({
    enabled: false,
    device: 'desktop'
});