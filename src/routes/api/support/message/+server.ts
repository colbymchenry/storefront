import {fail, json} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../../_utils/firebase-admin-utils";

// @ts-ignore
export async function POST({request}) {
    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        let ticket = await firebaseAdminUtils.getDoc("tickets", data["ticket_id"]);

        if (!ticket.user_id) {
            let user = await firebaseAdminUtils.getDoc("users", user_id);
            if (!user.admin) {
                return fail(402);
            }
        }

        data["user_id"] = user_id;
        data["created_at"] = firebaseAdminUtils.serverTimestamp();

        await firebaseAdminUtils.firestore().collection("ticket-messages").add(data);

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}