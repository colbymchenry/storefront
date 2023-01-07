import type ILSDiscountCouponCatalogLimit from "./ILSDiscountCouponCatalogLimit";

export default interface ILSDiscountCouponInfo {
    name:string;//	Coupon title in store control panel
    code:string;//	Coupon code
    discountType:string;//	Discount type: ABS, PERCENT, SHIPPING, ABS_AND_SHIPPING, PERCENT_AND_SHIPPING
    status:string;//	Discount coupon state: ACTIVE, PAUSED, EXPIRED or USEDUP
    discount:number;//	Discount amount
    launchDate:string;//	The date of coupon launch, e.g. 2014-06-06 08:00:00 +0000
    expirationDate:string;//	Coupon expiration date, e.g. 2014-06-06 08:00:00 +0000
    totalLimit:number;//	The minimum order subtotal the coupon applies to
    usesLimit:string;//	Number of uses limitation: UNLIMITED, ONCEPERCUSTOMER, SINGLE
    applicationLimit:string;//	Application limit for discount coupons. Possible values: "UNLIMITED", "NEW_CUSTOMER_ONLY", "REPEAT_CUSTOMER_ONLY"
    creationDate:string;//	Coupon creation date
    orderCount:number;//	Number of uses
    catalogLimit: ILSDiscountCouponCatalogLimit;//	Products and categories the coupon can be applied to
}