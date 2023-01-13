import {lightspeedServerUtils} from "../../api/_utils/lightspeed-utils";

export async function load(req: any) {
    if (req.params.slug) {
        let {data} = await lightspeedServerUtils.getProducts(null, req.params.slug);
        let resp = await lightspeedServerUtils.getVariations(data.id);
        return {
            product: data,
            variations: resp.data
        }
    }
    return {
    };
}