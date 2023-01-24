import {lightspeedServerUtils} from "../../api/_utils/lightspeed-utils";

export async function load(req: any) {
    if (req.params.slug) {
        let params = new URLSearchParams();
        params.append('categories', req.params.slug);
        let {data} = await lightspeedServerUtils.getProducts(params);
        let category = await lightspeedServerUtils.getCategories(null, req.params.slug);
        return {
            products: data,
            category: category.data
        }
    }
    return {
    };
}