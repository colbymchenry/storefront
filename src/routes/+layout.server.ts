import {firebaseAdminUtils} from "../lib/utils/firebase/firebase-admin-utils";

// @ts-ignore
export async function load(route) {
    let themeDoc = await firebaseAdminUtils.getDoc("settings", "theme");
    if (themeDoc) {
        delete themeDoc['updated_at'];
        delete themeDoc['created_at'];
    }
    return {
        theme: themeDoc,
        editor: route.url.searchParams.get('editor')
    };
}