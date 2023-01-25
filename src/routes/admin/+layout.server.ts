import {project_id} from "$lib/stores/cookies";
import type ICookie from "$lib/interfaces/ICookie";
import {firebaseAdminUtils} from "../api/_utils/firebase-admin-utils";
import {redirect} from "@sveltejs/kit";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let profileData: any = {};

    if (cookie?.user_id && cookie?.authenticated) {
        let userAcct = await firebaseAdminUtils.getDoc("users", cookie.user_id);

        if (!userAcct?.admin) {
            throw redirect(303, '/');
        }

        profileData = await firebaseAdminUtils.getDoc("customers", cookie.user_id);
    } else {
        throw redirect(303, '/');
    }

    return {
        profile: profileData
    }
}