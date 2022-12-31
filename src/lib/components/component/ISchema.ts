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