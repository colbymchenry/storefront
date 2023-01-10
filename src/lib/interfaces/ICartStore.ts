import type ILSProduct from "./lightspeed/ILSProduct";

export default interface ICartStore {
    cart?: ICart;
    couponDiscount?: number;
    customerGroupDiscount?: number;
    customerGroupVolumeDiscount?: number;
    discount?: number;
    handlingFee?: number;
    handlingFeeWithoutTax?: number;
    pricesIncludeTax?: boolean;
    shipping?: number;
    shippingWithoutTax?: number;
    subtotal?: number;
    subtotalWithoutTax?: number;
    tax?: number;
    total?: number;
    totalWithoutTax?: number;
    volumeDiscount?: number;
}

export interface ICart {
    cartId?: string;
    items?: ILSProduct[];
    orderId?: number;
    productsQuantity?: number;
    shippingPerson?: IShippingPerson;
    weight?: number;
}

export interface IShippingPerson {
    countryCode?: string;
    stateOrProvinceCode?: string;
    countryName?: string;
}