import {project_id} from "$lib/stores/cookies";
import type ICookie from "$lib/interfaces/ICookie";
import {firebaseAdminUtils} from "../api/_utils/firebase-admin-utils";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let profileData: any = {
    };

    if (cookie?.user_id && cookie?.authenticated) {
        profileData = await firebaseAdminUtils.getDoc("customers", cookie.user_id);
    }

    return {
        profile: profileData
    }
}