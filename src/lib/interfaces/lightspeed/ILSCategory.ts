export default interface ILSCategory {
    "id": number;
    "parentId": number | undefined;
    "orderBy": number;
    "name": string;
    "nameTranslated": object;
    "url": string;
    "productCount": number;
    "description": string;
    "descriptionTranslated": object;
    "enabled": boolean;
    "isSampleCategory": boolean;
    "seoTitle": string;
    "seoTitleTranslated": object;
    "seoDescription": string;
    "seoDescriptionTranslated": object;
}