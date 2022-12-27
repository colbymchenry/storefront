import {firebaseAdminUtils} from "../lib/utils/firebase/firebase-admin-utils";

export interface ICookie {
    is18: boolean;
}

export const {project_id} = JSON.parse(process.env.FIREBASE_CONFIG);


let cookieStorage: ICookie = {
    "is18": false
}


// @ts-ignore
export async function load({url, cookies}) {

    let themeDoc = await firebaseAdminUtils.getDoc("settings", "theme");
    let storeDoc = await firebaseAdminUtils.getDoc("settings", "main");

    if (themeDoc) {
        delete themeDoc['updated_at'];
        delete themeDoc['created_at'];
    }

    if (storeDoc) {
        delete storeDoc['updated_at'];
        delete storeDoc['created_at'];
    }

    if (!cookies.get(project_id)) {
        cookies.set(project_id, JSON.stringify(cookieStorage));
    }

    try {
        JSON.parse(cookies.get(project_id));
    } catch (error) {
        cookies.set(project_id, JSON.stringify(cookieStorage));
    }

    return {
        theme: themeDoc,
        store: storeDoc,
        editor: url.searchParams.get('editor'),
        cookies: JSON.parse(cookies.get(project_id))
    };
}

