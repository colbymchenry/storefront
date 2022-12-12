import {firebaseAdminUtils} from "../lib/utils/firebase/firebase-admin-utils";

export async function load() {
    let themeDoc = await firebaseAdminUtils.getDoc("settings", "theme");
    if (themeDoc) {
        delete themeDoc['updated_at'];
        delete themeDoc['created_at'];
    }
    return {
        theme: themeDoc
    };
}