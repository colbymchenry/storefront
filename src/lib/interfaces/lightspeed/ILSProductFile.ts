export default interface ILSProductFile {
    id?: number;//	Internal ID of the file
    name?: string;//	File name
    description?: string;//	File description defined by the store administrator
    size?: number;//	File size, bytes (64-bit integer)
    adminUrl?: string;//	Direct link to the file. Important: to download the file, add your API token to this URL like this: https://app.ecwid.com/api/v3/4870020/products/37208340/files/7215102?token=YOUR-API-TOKEN
}