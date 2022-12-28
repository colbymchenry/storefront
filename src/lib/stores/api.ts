import axios from "axios";
import {get} from "svelte/store";
import {firebaseClientUtils} from "../utils/firebase/firebase-client-utils";
import {cookies} from "./cookies";

function createApi() {

    let fb = get(firebaseClientUtils);

    return {
        post: async (route: string, payload?: any, headers?: any) => {
            let cookieStore: any = get(cookies);

            let token = fb?.auth?.currentUser ? await fb.auth.currentUser.getIdToken() : cookieStore?.idToken;

            return await axios.post(route, payload || {}, token ? {
                headers: {
                    ...(headers && {...headers}), // add headers if any are passed
                    Authorization: token
                }
            } : {});
        },
        get: async (route: string, payload?: any, headers?: any) => {
            if (!payload) payload = {}
            if (!route) return undefined;
            let parameterSlice: string[] = [];

            Object.keys(payload).map(key => {
                if (typeof payload[key] === 'object') { //check for apiPayload (input)
                    Object.keys(payload[key]).map(k => parameterSlice = [...parameterSlice, k + "=" + encodeURIComponent(payload[key][k])])
                } else { //don't want to map the object; it doesn't work
                    parameterSlice = [...parameterSlice, key + "=" + encodeURIComponent(payload[key])]
                }
            })
            const query = parameterSlice.join("&");

            let cookieStore: any = get(cookies);

            let token = fb?.auth?.currentUser ? await fb.auth.currentUser.getIdToken() : cookieStore?.idToken;

            console.log(token);

            // get the token from the store
            return await axios.get(route + (route.includes("?") ? "&" : "?") + query, token ? {
                headers: {
                    ...(headers && {...headers}),
                    Authorization: token
                }
            } : {});
        }
    };
}

export const api = createApi();