import type ILSRelatedCategory from "./ILSRelatedCategory";

export default interface ILSRelatedProducts {
    productIds?:Array<number>;//	IDs of the related products
    relatedCategory?:ILSRelatedCategory;//	Describes the "N random related products from a category" option
}