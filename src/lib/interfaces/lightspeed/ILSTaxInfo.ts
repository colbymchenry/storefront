export default interface ILSTaxInfo {
    taxable?: boolean;//	true to apply taxes to this product, false otherwise
    defaultLocationIncludedTaxRate?: number;//	Default tax rate (%) for including into product price. Is a sum of all enabled taxes included in product price for the store location. Read only
    enabledManualTaxes?: Array<number>;//	Array of internal Ecwid tax IDs, as listed in Store profile. Empty array if no manual taxes are enabled or automatic taxes are enabled
    taxClassCode?: string;//	A unique tax class code for the product that determine the taxability of the products for a certain region. If not specified the default value is Default
}