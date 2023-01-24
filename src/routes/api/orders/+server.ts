import {fail, json} from "@sveltejs/kit";
import {lightspeedServerUtils} from "../_utils/lightspeed-utils";

// @ts-ignore
export async function POST({request, url}) {
    try {
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}