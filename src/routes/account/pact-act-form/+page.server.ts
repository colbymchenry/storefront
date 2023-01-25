import {firebaseAdminUtils} from "../../api/_utils/firebase-admin-utils";
import type ICookie from "../../../lib/interfaces/ICookie";
import {project_id} from "../../../lib/stores/cookies";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let storeData: any = [];

    if (cookie?.user_id && cookie?.authenticated) {
        let query = firebaseAdminUtils.firestore().collection("stores").where("user_id", "==", cookie.user_id);
        let rows = await firebaseAdminUtils.query(query);
        storeData = rows;
    }

    return {
        stores: storeData
    }
}