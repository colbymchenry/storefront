export default interface ILSProductImage {
    id?: number;//	Internal image ID
    orderBy?: number;//	The sort weight of the image in the gallery images list. The less the number, the closer the image to the beginning of the gallery
    isMain?: boolean;//	true if this is a main product image. false if gallery image
    image160pxUrl?: string;//	URL of the product thumbnail resized to fit 160x160px
    image400pxUrl?: string;//	URL of the product thumbnail displayed on the product list pages. Thumbnails size is defined in the store settings. Default size of the biggest dimension is 400px
    image800pxUrl?: string;//	Product HD thumbnail URL resized to fit 800x800px
    image1500pxUrl?: string;//	URL of the product image resized to fit 1500x1500px
    imageOriginalUrl?: string;//	URL of the image in its original resolution
}