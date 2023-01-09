import axios, {type AxiosResponse} from "axios";
import {firebaseAdminUtils} from "./firebase-admin-utils";

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

    const getProducts = async (queryParams?: URLSearchParams) => await get('products' + (queryParams ? '?' + queryParams.toString() : ''));

    const getCategories = async (queryParams?: URLSearchParams) => await get('categories' + (queryParams ? '?' + queryParams.toString() : ''));

    return {
        post, get, put, getProducts, getCategories
    };
}

export const lightspeedServerUtils = createLightspeed();