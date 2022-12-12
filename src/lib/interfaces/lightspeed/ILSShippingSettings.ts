export default interface ILSShippingSettings {
    // "GLOBAL_METHODS" – all standard shipping methods set up in store settings;
    // "SELECTED_METHODS" – Ecwid will use enabledMethods and disabledMethods list to make shipping calculations;
    // "FLAT_RATE" – sets flat rate for product's shipping, see flatRate field
    type?: 'GLOBAL_METHODS' | "SELECTED_METHODS" | "FLAT_RATE" | "FREE_SHIPPING";
    // Additional cost for shipping methods set by merchant (global and selected)
    methodMarkup?: number;
    // Flat rate cost for shipping this product
    flatRate?: number;
    // IDs of shipping methods that need to be excluded from calculation when this product is in cart.
    // IDs can be retrieved in Store profile (https://api-docs.ecwid.com/reference/store-profile)
    disabledMethods?: [string];
    enabledMethods?: [string];
}