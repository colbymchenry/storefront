import {api} from "../stores/api";

function createLightspeed() {

    const getProducts = async (queryParams?: URLSearchParams) => await api.get('api/products' + (queryParams ? '?' + queryParams.toString() : ''));

    const getCategories = async (queryParams?: URLSearchParams) => await api.get('api/categories' + (queryParams ? '?' + queryParams.toString() : ''));

    return {
       getProducts, getCategories
    };
}

export const lightspeedClientUtils = createLightspeed();