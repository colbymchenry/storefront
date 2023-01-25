import {fail, json} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../../../_utils/firebase-admin-utils";

// @ts-ignore
export async function POST({request}) {
    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        let user = await firebaseAdminUtils.getDoc("users", user_id);
        if (!user.admin) {
            return fail(402);
        }

        await firebaseAdminUtils.firestore().collection("tickets").doc(data["ticket_id"]).update({
            open: true
        });

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}