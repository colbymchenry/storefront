import {api} from "../stores/api";
import type ILSOrderRequest from "../interfaces/lightspeed/ILSOrderRequest";
import type ILSOrderResponse from "../interfaces/lightspeed/ILSOrderResponse";

function createLightspeed() {

    const getProducts = async (queryParams?: URLSearchParams) => await api.get('api/products' + (queryParams ? '?' + queryParams.toString() : ''));

    const getCategories = async (queryParams?: URLSearchParams) => await api.get('api/categories' + (queryParams ? '?' + queryParams.toString() : ''));

    const createOrder = async (order: ILSOrderRequest): Promise<ILSOrderResponse> => {
        let {data} = await api.post('api/orders', order);
        let res:ILSOrderResponse = {
            orderid: data.orderid
        }
        return res;
    };
    return {
       getProducts, getCategories, createOrder
    };
}

export const lightspeedClientUtils = createLightspeed();