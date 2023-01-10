import {api} from "../stores/api";
import type ILSOrderRequest from "../interfaces/lightspeed/ILSOrderRequest";
import type ILSOrderResponse from "../interfaces/lightspeed/ILSOrderResponse";
import type ILSProduct from "../interfaces/lightspeed/ILSProduct";
import Ecommerce from "@ecwid/sdk";
import {cart} from "../stores/cart";

function createLightspeed() {

    const ecommerce = new Ecommerce({
        storeId: 81408535
    });

    ecommerce.cart.get().then((c) => {
        cart.update((oldVal) => {
            return {
                ...oldVal, cartId: c.cartId
            }
        })
    })

    const getProducts = async (queryParams?: URLSearchParams): Promise<ILSProduct[]> => {
        let {data} = await api.get('api/products' + (queryParams ? '?' + queryParams.toString() : ''));
        return data.items.map((item: any) => {
            let prod:ILSProduct = {...item};
            return prod;
        })
    }

    const getCategories = async (queryParams?: URLSearchParams) => await api.get('api/categories' + (queryParams ? '?' + queryParams.toString() : ''));

    const createOrder = async (order: ILSOrderRequest): Promise<ILSOrderResponse> => {
        let {data} = await api.post('api/orders', order);
        let res:ILSOrderResponse = {
            orderid: data.orderid
        }
        return res;
    };

    return {
       getProducts, getCategories, createOrder, sdk: ecommerce, ecwid: () => {
           if (typeof window !== undefined) {
               // @ts-ignore
               return window.Ecwid;
           }
        }
    };
}

export const lightspeedClientUtils = createLightspeed();