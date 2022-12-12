export default interface ILSTax {
    // true to apply taxes to this product, false otherwise
    taxable?: boolean;
    // Array of internal Ecwid tax IDs, as listed in Store profile. Empty array if no manual taxes are enabled or
    // automatic taxes are enabled (https://api-docs.ecwid.com/reference/store-profile)
    enabledManualTaxes?: [number];
}