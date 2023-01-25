import {fail, json} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../_utils/firebase-admin-utils";
import type ICookie from "../../../lib/interfaces/ICookie";
import {project_id} from "../../../lib/stores/cookies";

// @ts-ignore
export async function POST({request, cookies}) {
    const cookie: ICookie = JSON.parse(cookies.get(project_id) || "{}");

    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        data["user_id"] = user_id;

        if (data["id"]) {

            let userAcct = await firebaseAdminUtils.getDoc("users", user_id);

            if (!userAcct?.admin) {
                return fail(402);
            }

            await firebaseAdminUtils.firestore().collection("pact-act-forms").doc(data["id"]).update(data)
        } else {
            data["approved"] = false;
            data["denied"] = false;
            data["created_at"] = firebaseAdminUtils.serverTimestamp();
            await firebaseAdminUtils.firestore().collection("pact-act-forms").add(data)
        }

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}