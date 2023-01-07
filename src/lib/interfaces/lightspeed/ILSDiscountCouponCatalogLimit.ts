export default interface ILSDiscountCouponCatalogLimit {
    products: Array<number>;//	The list of product IDs the coupon can be applied to
    categories: Array<number>;//	The list of category IDs the coupon can be applied to
}