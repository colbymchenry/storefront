import {fail, json} from "@sveltejs/kit";
import {lightspeedServerUtils} from "../_utils/lightspeed-utils";

// @ts-ignore
export async function GET({request, url}) {
    try {
        let res = await lightspeedServerUtils.getVariations(url.searchParams.get("productId"));
        return json(res.data);
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}