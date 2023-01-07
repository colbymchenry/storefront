import type ILSHandlingFeeTaxes from "./ILSHandlingFeeTaxes";

export default interface ILSHandlingFeeInfo {
    name?:string;//	Handling fee name set by store admin. E.g. Wrapping
    value?:number;//	Handling fee value
    description?:string;//	Handling fee description for customer
    taxes?: ILSHandlingFeeTaxes;//	Taxes applied to the handling fee
}