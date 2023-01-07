export default interface ILSRelatedCategory {
    enabled?: boolean;//	true if the "N random related products from a category" option is enabled. false otherwise
    categoryId?: number;//	Id of the related category. Zero value means "any category", that is, random products from the whole store.
    productCount?: number;//	Number of random products from the given category to be shown as related
}