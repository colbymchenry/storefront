import {firebaseAdminUtils} from "../../api/_utils/firebase-admin-utils";
import type ICookie from "../../../lib/interfaces/ICookie";
import {project_id} from "../../../lib/stores/cookies";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let forms: any = [];

    if (cookie?.user_id && cookie?.authenticated) {
        if (!url.searchParams.has('status') || url.searchParams.get('status') === "needsApproval") {
            let query = firebaseAdminUtils.firestore().collection("pact-act-forms").where("approved", "==", false).where("denied", "==", false);
            forms = await firebaseAdminUtils.query(query);
        } else if (url.searchParams.get('status') === 'approved') {
            let query = firebaseAdminUtils.firestore().collection("pact-act-forms").where("approved", "==", true).where("denied", "==", false);
            forms = await firebaseAdminUtils.query(query);
        } else if (url.searchParams.get('status') === 'denied') {
            let query = firebaseAdminUtils.firestore().collection("pact-act-forms").where("approved", "==", false).where("denied", "==", true);
            forms = await firebaseAdminUtils.query(query);
        }
    }

    return {
       forms
    }
}