import type ILSProduct from "./ILSProduct";

export default interface ILSProductResponse {
    total: number;
    limit: number;
    offset: number;
    count: number;
    items: ILSProduct[];
}