import {fail, json} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../_utils/firebase-admin-utils";

// @ts-ignore
export async function POST({request, url}) {
    try {
        let data = await request.json();

        let {user_id} = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("authorization"));

        let userPerms = await firebaseAdminUtils.getUserPerms(user_id);

        if (!userPerms.admin && !userPerms.staff) {
            return fail(400);
        }

        if (url.searchParams.has("create")) {
            await firebaseAdminUtils.firestore().collection("reps").doc(data.userId).set({});
        } else if (url.searchParams.has("delete")) {
            try {
                await firebaseAdminUtils.firestore().collection("reps").doc(data.userId).delete();
            }catch(error){}
            try {
                await firebaseAdminUtils.auth().deleteUser(data.userId);
            }catch(error) {}
        }

        return json({});
    } catch (error) {
        console.error(error);
        return fail(400);
    }
}