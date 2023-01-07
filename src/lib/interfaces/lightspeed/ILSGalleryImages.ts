export default interface ILSGalleryImages {
    id?:number;//	Id of an image in the gallery
    url?:string;//	URL of an image
    thumbnail?:string;//	URL of a thumbnail (160px)
    originalImageUrl?:string;//	URL of an original image
    imageUrl?:string;//	URL of an image (1200px)
    hdThumbnailUrl?:string;//	URL of an HD-thumbnail (800px)
    thumbnailUrl?:string;//	URL of a big thumbnail (400px)
    smallThumbnailUrl?:string;//	URL of a thumbnail (160px)
    width?:number;//	Width of an image (px)
    height?:number;//	Height of an image (px)
    orderBy?:number;//	Consecutive number of an image in the gallery
}