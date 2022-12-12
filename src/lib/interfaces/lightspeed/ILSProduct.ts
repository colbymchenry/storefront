import type ILSWholesalePrice from "./ILSWholesalePrice";
import type ILSTax from "./ILSTax";
import type ILSProductOption from "./ILSProductOption";
import type ILSShippingSettings from "./ILSShippingSettings";
import type ILSProductDimensions from "./ILSProductDimensions";

export default interface ILSProduct {
    // Product title
    name: string;
    // Product SKU. If this field is empty, Ecwid will generate new unique SKU automatically.
    sku?: string;
    // TODO Amount of product items in stock.
    quantity?: number;
    // Set as true to make Unlimited stock for the product and to not track product inventory.
    unlimited?: boolean;
    // Base product price
    price?: number;
    // TODO Sorted array of wholesale price tiers (quantity limit and price pairs)
    wholesalePrices?: [ILSWholesalePrice];
    // Product's sale price displayed strike-out in the customer frontend
    compareToPrice?: number;
    // Purchase price (the price at which the seller bought the product from the supplier).
    // A positive number, 0 by default. The field is not shown in the UI and can be used for reports and profit calculations
    costPrice?: number;
    // TODO Detailed information about product's taxes
    tax?: [ILSTax];
    // TODO true if product requires shipping, false otherwise
    isShippingRequired?: boolean;
    // TODO Product weight in the units defined in store settings. Leave empty for intangible products
    weight?: number;
    // TODO true to make product enabled, false otherwise. Disabled products are not displayed in the store front.
    enabled?: boolean;
    // TODO List of the product options.
    options?: [ILSProductOption];
    //TODO The minimum 'warning' amount of the product items in stock, if set.
    // When the product quantity reaches this level, the store administrator gets an email notification.
    warningLimit?: number;
    // TODO Shipping settings of this product
    shipping?: [ILSShippingSettings];
    // Product description in HTML
    description?: string;
    // TODO List of the categories, which the product belongs to.
    // If no categories provided, product will be displayed on the store front page, see showOnFrontpage field
    categoryIds?: [number];
    // Page title to be displayed in search results on the web. Recommended length is under 55 characters.
    // Is empty if value wasn't changed by merchant from the product itself
    seoTitle?: string;
    // Page description to be displayed in search results on the web. Recommended length is under 160 characters.
    // Is empty if value wasn't changed by merchant from the product itself
    seoDescription?: string;
    // TODO Product dimensions info
    dimensions?: ILSProductDimensions;
    // TODO Product volume, fractional number, 0 by default.
    volume?: number;
    // TODO The unit of measurement of the store's volume, possible values: l, ml, oz. ml by default.
    volumeUnit?: 'l' | 'ml' | 'oz';
    // TODO true if Ecwid can apply discounts to this product at checkout. false otherwise
    discountsAllowed?: boolean;
    // TODO Indicates whether an out of stock product should visible or not.
    outOfStockVisibilityBehaviour?: 'SHOW' | 'HIDE' | 'ALLOW_PREORDER';
}