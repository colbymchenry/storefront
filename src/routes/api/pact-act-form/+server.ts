import {error, fail, json} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../_utils/firebase-admin-utils";
import type ICookie from "../../../lib/interfaces/ICookie";
import {project_id} from "../../../lib/stores/cookies";

// @ts-ignore
export async function POST({request, cookies}) {
    const cookie: ICookie = JSON.parse(cookies.get(project_id) || "{}");

    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));
        
        // whos approving or denying this pact act form
        data["user_id"] = user_id;

        if (data["id"]) {

            let userAcct = await firebaseAdminUtils.getDoc("users", user_id);
            let staffAcct = await firebaseAdminUtils.getDoc("staff", user_id);
            let repAcct = await firebaseAdminUtils.getDoc("reps", user_id);

            // admin, staff, and sales reps can approve or deny pact act forms
            if (!userAcct?.admin && !staffAcct && !repAcct) {
                throw error(402, {
                    message: 'Insufficient perms.'
                });
            }

            await firebaseAdminUtils.firestore().collection("pact-act-forms").doc(data["id"]).update(data)
        } else {
            data["approved"] = false;
            data["denied"] = false;
            data["created_at"] = firebaseAdminUtils.serverTimestamp();
            await firebaseAdminUtils.firestore().collection("pact-act-forms").add(data)
        }

        return json({});
    } catch (e) {
        console.error(e);
        throw error(400, {
            message: e.message
        });
    }
}