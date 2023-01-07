import type ILSSelectionInfo from "./ILSSelectionInfo";

export default interface ILSOrderItemOption {
    name: string;
    type?: 'CHOICE' | 'CHOICES' | 'TEXT' | 'DATE' | 'FILES';
    value: string;
    files?: Array<any>;
    selections?: Array<ILSSelectionInfo>;
}