import type ILSCategory from "./ILSCategory";

export default interface ILSCategories {
    total: number;
    count: number;
    offset: number;
    limit: number;
    items: ILSCategory[];
}