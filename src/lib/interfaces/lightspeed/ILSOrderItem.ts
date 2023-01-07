import type ILSOrderItemOption from "./ILSOrderItemOption";
import type ILSOrderItemTax from "./ILSOrderItemTax";
import type ILSProductDimensions from "./ILSProductDimensions";

export default interface ILSOrderItem {
    name: string;//	Product name
    quantity?: number;//	Amount purchased
    productId?: number;//	Store product ID
    categoryId?: number;//	ID of the category this product belongs to. If the product belongs to many categories, categoryID will return the ID of the default product category. If the product doesn't belong to any category, 0 is returned
    price?: number;//	Price of ordered item in the cart
    productPrice?: number;//	Basic product price without options markups, wholesale discounts etc.
    weight?: number;//	Product weight
    sku?: string;//	Product or variation SKU. If you specified variation SKU, you must set selectedOptions field as well
    shortDescription?: string;//	Product description truncated to 120 characters
    tax?: number;//	Tax amount applied to the item
    combinationId?: number;//	The ID of a chosen combination. If not specified, it will be calculated automatically
    shipping?: number;//	Order item shipping cost
    quantityInStock?: number;//	The number of products in stock in the store
    isShippingRequired?: boolean;//	true/false: shows whether the item requires shipping
    trackQuantity?: boolean;//	true/false: shows whether the store admin set to track the quantity of this product and get low stock notifications
    fixedShippingRateOnly?: boolean;//	true/false: shows whether the fixed shipping rate is set for the product
    fixedShippingRate?: number;//	Fixed shipping rate for the product
    digital?: boolean;//	true/false: shows whether the item has downloadable files attached
    couponApplied?: boolean;//	true/false: shows whether a discount coupon is applied for this item
    selectedOptions?: Array<ILSOrderItemOption>;//	Product options values selected by the customer. Must be provided if you specify the sku field
    taxes?: Array<ILSOrderItemTax>;//	Taxes applied to this order item
    dimensions?: ILSProductDimensions;// Product dimensions info
    isCustomerSetPrice?: boolean;//	true if price for the ordered product was set up by a customer ("Pay What You Want" feature is enabled). false otherwise.
    isPreorder?: boolean;//	true if the product is pre-ordered because it was out of stock. Learn more about Accepting pre-orders. Otherwise the field should not be passed.
}