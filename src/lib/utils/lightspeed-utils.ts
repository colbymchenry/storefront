import axios from "axios";
import {firebaseAdminUtils} from "./firebase/firebase-admin-utils";

function createLightspeed() {
    const post = async (path: string, payload: object) => {
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

    const put = async (path: string, payload: object) => {
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

    const get = async (path: string) => {
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

    const getProducts = async (keyword?: any) => await get('products' + (keyword ? `?keyword=${keyword}` : ''));


    const getCategories = async () => await get('categories');

    return {
        post, get, getProducts, getCategories
    };
}

export const lightspeedUtils = createLightspeed();