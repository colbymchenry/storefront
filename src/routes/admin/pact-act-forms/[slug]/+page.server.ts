import {firebaseAdminUtils} from "../../../api/_utils/firebase-admin-utils";
import type ICookie from "$lib/interfaces/ICookie";
import {project_id} from "$lib/stores/cookies";

// @ts-ignore
export async function load({url, params, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let storeData: any = [];

    if (cookie?.user_id && cookie?.authenticated) {
        let query = firebaseAdminUtils.firestore().collection("stores").where("user_id", "==", cookie.user_id);
        storeData = await firebaseAdminUtils.query(query);

    }

    let form = await firebaseAdminUtils.getDoc("pact-act-forms", params.slug);
    form["id"] = params.slug;
    if (form["created_at"])
        form["created_at"] = firebaseAdminUtils.toDate(form["created_at"]);

    return {
        stores: storeData,
        form
    }
}