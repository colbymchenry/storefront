import {api} from "../stores/api";
import type ILSOrderRequest from "../interfaces/lightspeed/ILSOrderRequest";
import type ILSOrderResponse from "../interfaces/lightspeed/ILSOrderResponse";
import type ILSProduct from "../interfaces/lightspeed/ILSProduct";
import Ecommerce from "@ecwid/sdk";
import {cart} from "../stores/cart";
import {get, writable} from "svelte/store";

export const productStore = writable({
    categories: {},
    products: {},
    variations: {}
});

function createLightspeed() {

    const ecommerce = new Ecommerce({
        storeId: 81408535
    });

    ecommerce.cart.get().then((c: any) => {
        cart.update((oldVal) => {
            return {...oldVal, cart: c};
        })
    })

    if (typeof window !== 'undefined') {
        window.Ecwid.OnCartChanged.add(function(c: any){
            cart.update((oldVal) => c)
            window.Ecwid.Cart.calculateTotal((order: any) => {
                cart.update((oldVal) => order)
            });
        });
    }

    const getProducts = async (queryParams?: URLSearchParams): Promise<ILSProduct[]> => {
        let storage = get(productStore);
        let toReturn: ILSProduct[] = [];

        // Check local storage to return product from store
        if (queryParams.has("productId")) {
            if (queryParams.get("productId").includes(",")) {
                toReturn = storage.products.filter((prod: ILSProduct) => queryParams.get("productId").includes(prod.id))
                if (toReturn.length === queryParams.get("productId").split(",").length) {
                    return toReturn;
                }

                queryParams.set("productId", queryParams.get("productId").split(",").filter((prodId: any) => !toReturn.find((p: ILSProduct) => p.id == prodId)).join(","))
            } else {
                if (storage.products[queryParams.get("productId")]) {
                    return storage.products[queryParams.get("productId")];
                }
            }
        }

        if (queryParams.has("categories")) {
            if (storage.categories[queryParams.get("categories")]) {
                return storage.categories[queryParams.get("categories")];
            }
        }

        let {data} = await api.get('/api/products' + (queryParams ? '?' + queryParams.toString() : ''));

        if (queryParams.has("categories")) {
            storage.categories[queryParams.get("categories")] = data.items;
        }

        data.items.forEach((item: any) => {
            let prod:ILSProduct = {...item};
            if (!storage.products[item.id]) {
                storage.products[item.id] = item;
            }
            return prod;
        })
        productStore.set(storage);

        return [...data.items, ...toReturn];
    }

    const getVariations = async (productId: any) => {
        let storage = get(productStore);

        if (storage.variations[productId]) return storage.variations[productId];

        let {data} = await api.get('/api/variations?productId=' + productId);
        storage.variations[productId] = data;
        productStore.set(storage);
        return data;
    }

    const getCategories = async (queryParams?: URLSearchParams) => await api.get('/api/categories' + (queryParams ? '?' + queryParams.toString() : ''));

    const createOrder = async (order: ILSOrderRequest): Promise<ILSOrderResponse> => {
        let {data} = await api.post('/api/orders', order);
        let res:ILSOrderResponse = {
            orderid: data.orderid
        }
        return res;
    };

    return {
       getProducts, getCategories, getVariations, createOrder, sdk: ecommerce, ecwid: () => {
           if (typeof window !== 'undefined') {
               // @ts-ignore
               return window.Ecwid;
           }
        }
    };
}

export const lightspeedClientUtils = createLightspeed();