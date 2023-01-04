import {firebaseAdminUtils} from "$lib/utils/firebase/firebase-admin-utils";
import {lightspeedUtils} from "$lib/utils/lightspeed-utils";
import {fail, json} from "@sveltejs/kit";

// @ts-ignore
export async function GET({request, url}) {
    try {
        await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));
        let res = await lightspeedUtils.getProducts(url.searchParams.get('keyword'));
        return json(res.data);
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}