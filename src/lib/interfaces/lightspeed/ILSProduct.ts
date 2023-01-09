import type ILSWholesalePrice from "./ILSWholesalePrice";
import type ILSProductOption from "./ILSProductOption";
import type ILSProductDimensions from "./ILSProductDimensions";
import type ILSGalleryImages from "./ILSGalleryImages";
import type ILSOriginalImage from "./ILSOriginalImage";
import type ILSProductImage from "./ILSProductImage";
import type ILSFavoritesStats from "./ILSFavoritesStats";
import type ILSCategoriesInfo from "./ILSCategoriesInfo";
import type ILSTaxInfo from "./ILSTaxInfo";
import type ILSShippingSettings from "./ILSShippingSettings";
import type ILSVariation from "./ILSVariation";
import type ILSRibbon from "./ILSRibbon";
import type ILSProductFile from "./ILSProductFile";
import type ILSAttributeValue from "./ILSAttributeValue";
import type ILSRelatedProducts from "./ILSRelatedProducts";
import type ILSubscriptionSettings from "./ILSubscriptionSettings";

export default interface ILSProduct {
    id?:number;//	Unique integer product identifier
    sku?:string;//	Product SKU. Items with options can have several SKUs specified in the product variations
    quantity?:number;//	Amount of product items in stock. This field is omitted for the products with unlimited stock
    unlimited?:boolean;//	true if the product has unlimited stock
    inStock?:boolean;//	true if the product or any of its variations is in stock (quantity is more than zero) or has unlimited quantity. false otherwise.
    name?:string;//	Product title
    price?:number;//	Base product price
    defaultDisplayedPrice?:number;//	Product price displayed in a storefront for logged out customer for default location (store location). May differ from the price value when the product has options and variations and the default variation's price is different from the base product price. It also includes taxes
    defaultDisplayedPriceFormatted?:string;//	Formatted display of defaultDisplayedPrice in the store's formatting for prices
    costPrice?:number;//	Purchase price (the price at which the seller bought the product from the supplier). A positive number, 0 by default. The field is not shown in the UI and can be used for reports and profit calculations
    tax?:ILSTaxInfo;//	Detailed information about product's taxes
    wholesalePrices?:Array<ILSWholesalePrice>;//	Sorted array of wholesale price tiers (quantity limit and price pairs)
    compareToPric?:number;//	Product's sale price displayed strike-out in the customer frontend Omitted if empty
    compareToPriceFormatted?:string;//	Formatted display of compareToPrice in the store's formatting for prices
    compareToPriceDiscount?:number;//	Sale price discount amount
    compareToPriceDiscountFormatted?:string;//	Sale price formatted discount amount (with store currency)
    compareToPriceDiscountPercent?:number;//	Sale price discount percent
    compareToPriceDiscountPercentFormatted?:string;//	Sale price discount percent (with percent sign)
    isShippingRequired?:boolean;//	true if product requires shipping, false otherwise
    weight?:number;//	Product weight in the units defined in store settings. Omitted for intangible products
    url?:string;//	URL of product details page in the storefront. URL will be provided in SEO-friendly format if Ecwid knows the store uses them.
    created?:string;//	Date and time of the product creation. Example: 2014-07-30 10:32:37 +0000
    updated?:string;//	Product last update date/time
    createTimestamp?:number;//	The date of product creation in UNIX Timestamp format, e.g 1427268654
    updateTimestamp?:number;//	Product last update date in UNIX Timestamp format, e.g 1427268654
    productClassId?:number;//	Id of the class (type) that this product belongs to. 0 value means the product is of the default 'General' class. See also: Product types and attributes in Ecwid
    enabled?:boolean;//	true if product is enabled, false otherwise. Disabled products are not displayed in the store front.
    options?:Array<ILSProductOption>;//	A list of the product options. Empty ([]) if no options are specified for the product.
    warningLimit?:number;//	The minimum 'warning' amount of the product items in stock, if set. When the product quantity reaches this level, the store administrator gets an email notification.
    fixedShippingRateOnly?:boolean;//	Legacy function – see shipping field instead. Is ignored if it is sent alongside shipping object. true if shipping cost for this product is calculated as 'Fixed rate per item' (managed under the "Tax and Shipping" section of the product management page in Ecwid Control panel). false otherwise. With this option on, the fixedShippingRate field specifies the shipping cost of the product
    fixedShippingRate?:number;//	Legacy function – see shipping field instead. Is ignored if it is sent alongside shipping object. When fixedShippingRateOnly is true, this field sets the product fixed shipping cost per item. When fixedShippingRateOnly is false, the value in this field is treated as an extra shipping cost the product adds to the global calculated shipping
    shipping?:ILSShippingSettings;//	Shipping settings of this product
    defaultCombinationId?:number;//	Identifier of the default product variation, which is defined by the default values of product options.
    originalImage?:Array<ILSOriginalImage>;//	Original image information
    description?:string;//	Product description in HTML
    hdThumbnailUrl?:string;//	Product description in HTML
    galleryImages?:Array<ILSGalleryImages>;//	List of the product gallery images (for updating alt tags and sort order)
    media?:Array<ILSProductImage>;//	Media files for a product (images)
    categoryIds?:Array<number>;//	Private token: List of the categories, which the product belongs to. Public token: List of the enabled categories the product belongs to. Any access token: If no categories provided, product is displayed on the store front page, see showOnFrontpage field, or all categories of that product are disabled
    categories?:Array<ILSCategoriesInfo>;//	List of the categories the product belongs to with brief details (for any access token). If no categories provided, product belogs to store front page, see showOnFrontpage field
    defaultCategoryId?:number;//	Default category ID of the product. If value is 0, then product does not have a default category and is not shown anywhere in storefront
    seoTitle?:string;//	Page title to be displayed in search results on the web. Recommended length is under 55 characters. Is empty if value wasn't changed by merchant from the product itself
    seoTitleTranslated?:string;//	Translations of the page title to be displayed in search results on the web
    seoDescription?:string;//	Page description to be displayed in search results on the web. Recommended length is under 160 characters. Is empty if value wasn't changed by merchant from the product itself
    seoDecriptionTranslated?:string;//	Translations of the page description to be displayed in search results on the web
    favorites?:ILSFavoritesStats;//	Product favorites stats
    attributes?:Array<ILSAttributeValue>;//	Product attributes and their values
    files?:Array<ILSProductFile>;//	Downloadable files (E-goods) attached to the product
    relatedProducts?:ILSRelatedProducts;//	Related or "You may also like" products of the product
    combinations?:Array<ILSVariation>;//	List of the product variations
    dimensions?:ILSProductDimensions;//	Product dimensions info
    volume?:number;//	Product volume, fractional number, 0 by default.
    showOnFrontpage?:number;//	A positive number indicates the position (index) of a product in the store front page – the smaller the number, the higher the product is displayed on a page. A missing field means the product is not shown in the store front page (for private tokens)
    isSampleProduct?:boolean;//	true if this product is a sample one (sample product when Ecwid store is initially created). false otherwise. Read only field
    isGiftCard?:boolean;//	true if a product is a gift card. false if it's a regular store product. Read only field
    discountsAllowed?:boolean;//	true if Ecwid can apply discounts to this product at checkout. false otherwise
    nameYourPriceEnabled?:boolean;//	true if the "Pay What You Want " feature is enabled. false otherwise.
    subscriptionSettings?:Array<ILSubscriptionSettings>;//	Subscription settings
    subtitle?:string;//	Short product description for categories or search pages.
    ribbon?:ILSRibbon;//	Small product label visible on categories and product pages.
    externalReferenceId?:string;//	External ID for products synced from external services (e.g. POS)
    customsHsTariffCode?:string;//	Product code for customs reference. Omitted if empty
    outOfStockVisibilityBehaviour?:string;//	Indicates whether an out of stock product should visible or not. One of: SHOW, HIDE, ALLOW_PREORDER.
}