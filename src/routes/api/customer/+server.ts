import {fail, json} from "@sveltejs/kit";
import {lightspeedServerUtils} from "../_utils/lightspeed-utils";
import {firebaseAdminUtils} from "../_utils/firebase-admin-utils";

// @ts-ignore
export async function POST({request}) {
    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        await firebaseAdminUtils.firestore().collection("customers").doc(user_id).set(data);

        let doc = await firebaseAdminUtils.getDoc("customers", user_id);

        if (!doc.lightspeedCustomerId) {
            try {
                let createCustomer = await lightspeedServerUtils.createCustomer(data);
            } catch (error) {
                console.error("CAN'T CREATE CUSTOMER");
            }
        }

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}