import {lightspeedServerUtils} from "../api/_utils/lightspeed-utils";

export async function load(req: any) {
    if (req.url.searchParams.has("search")) {
        let params = new URLSearchParams();
        params.append('keyword', req.url.searchParams.get("search") + "*");
        let {data} = await lightspeedServerUtils.getProducts(params);
        return {
            products: data
        }
    }
    return {
    };
}