import axios, {type AxiosResponse} from "axios";
import {firebaseAdminUtils} from "./firebase-admin-utils";
import type ILSCustomer from "../../../lib/interfaces/lightspeed/ILSCustomer";

function createLightspeed() {

    const post = async (path: string, payload: object): Promise<AxiosResponse> => {
        let settings = await firebaseAdminUtils.getDoc("settings", "main");
        if (!settings?.lightspeed?.store_id || !settings?.lightspeed?.private_token) {
            throw('Go to settings and configure Lightspeed API.');
        }
        const url = `https://app.ecwid.com/api/v3/${settings.lightspeed.store_id}/${path}`;
        return await axios.post(url, payload, {
            headers: {
                'Authorization': 'Bearer ' + settings.lightspeed.private_token
            }
        })
    }

    const put = async (path: string, payload: object): Promise<AxiosResponse> => {
        let settings = await firebaseAdminUtils.getDoc("settings", "main");
        if (!settings?.lightspeed?.store_id || !settings?.lightspeed?.private_token) {
            throw('Go to settings and configure Lightspeed API.');
        }
        const url = `https://app.ecwid.com/api/v3/${settings.lightspeed.store_id}/${path}`;
        return await axios.put(url, payload, {
            headers: {
                'Authorization': 'Bearer ' + settings.lightspeed.private_token
            }
        })
    }

    const get = async (path: string): Promise<AxiosResponse> => {
        let settings = await firebaseAdminUtils.getDoc("settings", "main");
        if (!settings?.lightspeed?.store_id || !settings?.lightspeed?.private_token) {
            throw('Go to settings and configure Lightspeed API.');
        }
        const url = `https://app.ecwid.com/api/v3/${settings.lightspeed.store_id}/${path}`;
        return await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + settings.lightspeed.private_token
            }
        })
    }

    const getProducts = async (queryParams?: URLSearchParams, productId?: any) => await get('products' + (productId ? "/" + productId : "") + (queryParams ? '?' + queryParams.toString() : ''));
    const getVariations = async (productId: any) => await get(`products/${productId}/combinations`);
    const getCategories = async (queryParams?: URLSearchParams, categoryId?: any) => await get('categories' + (categoryId ? "/" + categoryId : "") + (queryParams ? '?' + queryParams.toString() : ''));

    const createCustomer = async (customer: ILSCustomer) => {
        return await post('customers', customer);
    }
    return {
        post, get, put, getProducts, getCategories, getVariations, createCustomer
    };
}

export const lightspeedServerUtils = createLightspeed();