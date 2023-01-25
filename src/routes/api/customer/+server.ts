import {fail, json} from "@sveltejs/kit";
import {lightspeedServerUtils} from "../_utils/lightspeed-utils";
import {project_id} from "$lib/stores/cookies";
import type ICookie from "$lib/interfaces/ICookie";
import {firebaseAdminUtils} from "../_utils/firebase-admin-utils";

// @ts-ignore
export async function POST({request, url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    try {
        let data = await request.json();

        await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        if (cookie.user_id) {
            await firebaseAdminUtils.firestore().collection("customers").doc(cookie.user_id).set(data);
        } else {
           await lightspeedServerUtils.createCustomer(data);
        }

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}