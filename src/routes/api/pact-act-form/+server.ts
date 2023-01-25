import {fail, json} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../_utils/firebase-admin-utils";

// @ts-ignore
export async function POST({request}) {
    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        data["user_id"] = user_id;

        if (data["id"]) {
            await firebaseAdminUtils.firestore().collection("pact-act-forms").doc(data["id"]).update(data)
        } else {
            data["approved"] = false;
            data["denied"] = false;
            await firebaseAdminUtils.firestore().collection("pact-act-forms").add(data)
        }

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}