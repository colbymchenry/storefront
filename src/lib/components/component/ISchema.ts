export interface ISchema {
    name: string;
    tag: string;
    class?: string;
    settings?: ISetting[];
}

export interface ISetting {
    type: 'header' | 'checkbox' | 'number' | 'radio' | 'range' | 'select' | 'text' | 'textarea' | 'collection' | 'color' | 'product' | 'image' | 'video';
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