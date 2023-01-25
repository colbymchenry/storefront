import {firebaseAdminUtils} from "./api/_utils/firebase-admin-utils";
import type ICookie from "../lib/interfaces/ICookie";
import {project_id} from "../lib/stores/cookies";
import {lightspeedServerUtils} from "./api/_utils/lightspeed-utils";

let cookieStorage: ICookie = {
    "is18": false,
    "authenticated": false,
    "idToken": undefined,
    "categories": undefined,
    "admin": false,
    "pactActApproved": false
}

// @ts-ignore
export async function load({url, cookies}) {

    let themeDoc = await firebaseAdminUtils.getDoc("settings", "theme");

    if (themeDoc) {
        delete themeDoc['updated_at'];
        delete themeDoc['created_at'];
    }

    if (!cookies.get(project_id)) {
        cookies.set(project_id, JSON.stringify(cookieStorage));
    }

    try {
        JSON.parse(cookies.get(project_id));
    } catch (error) {
        cookies.set(project_id, JSON.stringify(cookieStorage));
    }

    let cookie = JSON.parse(cookies.get(project_id));

    if (cookie?.user_id && cookie?.authenticated) {
        let userAcct = await firebaseAdminUtils.getDoc("users", cookie.user_id);

        if (userAcct?.admin) {
            cookie.admin = true;
        }

        let query = firebaseAdminUtils.firestore().collection("pact-act-forms").where("user_id", "==", cookie.user_id).where("approved", "==", true);
        let data = await firebaseAdminUtils.query(query);

        if (data.length) {
            cookie.pactActApproved = true;
        }
    }

    // TODO: Figure out refreshing this, caching and waiting
    try {
        let res = await lightspeedServerUtils.get("categories");
        cookie.categories = res.data;
    } catch (error) {
        console.error(error)
    }

    cookies.set(project_id, JSON.stringify(cookie));

    return {
        theme: themeDoc,
        editor: url.searchParams.get('editor'),
        cookies: JSON.parse(cookies.get(project_id))
    };
}

