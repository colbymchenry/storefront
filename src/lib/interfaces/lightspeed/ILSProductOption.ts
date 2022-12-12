import type ILSProductOptionChoice from "./ILSProductOptionChoice";

export default interface ILSProductOption {
    type: 'SELECT' | 'RADIO' | 'CHECKBOX' | 'TEXTFIELD' | 'TEXTAREA' | 'DATE' | 'FILES' | 'SIZE';
    name: string;
    // All possible option selections for the types SELECT, CHECKBOX or RADIO or SIZE.
    // This field is omitted for the product option with no selection (e.g. text, datepicker or upload file options)
    choices: [ILSProductOptionChoice];
    // The number, starting from 0, of the option's default selection. Only presents if the type is
    // SELECT or RADIO or SIZE and is required in this case
    defaultChoice: number;
    // true if this option is required, false otherwise. Default is false
    required: boolean;
}