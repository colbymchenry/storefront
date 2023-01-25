import {fail, json} from "@sveltejs/kit";
import {lightspeedServerUtils} from "../_utils/lightspeed-utils";

// @ts-ignore
export async function POST({request, url}) {
    try {
        let data = await request.json();
        let res = await lightspeedServerUtils.createCustomer(data);
        return json(res.data);
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}