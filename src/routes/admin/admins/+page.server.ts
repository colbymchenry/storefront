import {firebaseAdminUtils} from "../../api/_utils/firebase-admin-utils";
import {redirect} from "@sveltejs/kit";
import type ICookie from "../../../lib/interfaces/ICookie";
import {project_id} from "../../../lib/stores/cookies";
// @ts-ignore
export async function load({url, cookies}) {

    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    if (cookie?.idToken) {
        try {
            let res = await firebaseAdminUtils.auth().verifyIdToken(cookie.idToken);
            let adminDoc = await firebaseAdminUtils.getDoc("admins", cookie.user_id);
            console.log(adminDoc);
        } catch (error) {
            throw redirect(303, '/account');
        }
    } else {
        throw redirect(303, '/account');
    }

    let admins = await firebaseAdminUtils.getCollectionArray("admins");

    return {
        admins
    }
}