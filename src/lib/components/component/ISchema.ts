export interface ISchema {
    name: string;
    tag: string;
    information?: string;
    class?: string;
    settings?: ISetting[];
    blocks?: IBlock[];
}

export interface ISetting {
    type: 'header' | 'checkbox' | 'number' | 'radio' | 'range' | 'select' | 'text' | 'textarea' | 'collection' | 'color' | 'product' | 'image' | 'video' | 'url';
    id?: string;
    label: string;
    default?: boolean | number | string;
    placeholder?: string;
    options?: IOption[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    regex?: string;
    hint?: string;
    values?: any[];
}

export interface IOption {
    value: string;
    label: string;
}

export interface IBlock {
    name: string;
    type: string;
    settings: ISetting[];
    id?: string;
}

export const heightValues: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];