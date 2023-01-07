import type ILSWholesalePrice from "./ILSWholesalePrice";
import type ILSAttributeValue from "./ILSAttributeValue";
import type ILSOptionValue from "./ILSOptionValue";

export default interface ILSVariation {
    id?:number;//	Variation ID
    combinationNumber?:number;//	Variation # number, which is displayed in the variations table in Control panel
    options?:Array<ILSOptionValue>;//	Set of options that identifies this variation. An array of name-value pairs
    sku?:string;//	Variation SKU. Omitted if the variation inherits the base product's SKU
    thumbnailUrl?:string;//	URL of the product variation thumbnail displayed on the product list pages. Thumbnails size is defined in the store settings. Default size of biggest dimension is 400px. Omitted if the variation inherits the base product's image. The original uploaded product image is available in the originalImageUrl field.
    imageUrl?:string;//	URL of the product variation image resized to fit 1500x1500px. Omitted if the variation inherits the base product's image. The original uploaded product image is available in the originalImageUrl field.
    smallThumbnailUrl?:string;//	URL of the product variation thumbnail resized to fit 160x160px. Omitted if the variation inherits the base product's image. The original uploaded product image is available in the originalImageUrl field.
    hdThumbnailUrl?:string;//	Product variation HD thumbnail URL resized to fit 800x800px. Omitted if the variation inherits the base product's image.
    originalImageUrl?:string;//	URL of the original not resized product variation image. Omitted if the variation inherits the base product's image.
    quantity?:number;//	Amount of the variation items in stock. If sku is omitted, then quantity of the variation is nested from base product. If sku is present, the variation has its own quantity value.
    unlimited?:boolean;//	true if the variation has unlimited stock (that is, never runs out)
    price?:number;//	Variation price. Omitted if the variation inherits the base product's price.
    wholesalePrices?:Array<ILSWholesalePrice>;//	Sorted array of the variation's wholesale price tiers (quantity limit and price). Omitted if the variation inherits the base product's tiered price settings.
    weight?:number;//	Variation weight in the units defined in store settings. Omitted if the variation inherits the base product's weight.
    warningLimit?:number;//	The minimum 'warning' amount of the product items in stock for this variation, if set. When the variation in stock amount reaches this level, the store administrator gets an email notification. Omitted if the variation inherits the base product's settings
    attributes?:Array<ILSAttributeValue>;//	Variation's UPC attribute and its value
    compareToPrice?:number;//	Variation's sale price displayed strike-out in the customer frontend Omitted if empty
}