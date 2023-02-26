import {project_id} from "$lib/stores/cookies";
import type ICookie from "$lib/interfaces/ICookie";
import {firebaseAdminUtils} from "../api/_utils/firebase-admin-utils";
import {redirect} from "@sveltejs/kit";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let profileData: any = {};

    if (cookie?.idToken) {
        let res: any;
        try {
            res = await firebaseAdminUtils.auth().verifyIdToken(cookie.idToken);
        } catch (error) {
            cookie.authenticated = false;
            cookie.user_id = undefined;
            cookie.idToken = undefined;
            try {
                cookies.set(project_id, JSON.stringify(cookie));
            } catch (error){}
            throw redirect(303, '/');
        }

        let userPerms = await firebaseAdminUtils.getUserPerms(res.uid);

        cookie.admin = userPerms.admin;
        cookie.salesRep = userPerms.rep;
        cookie.staff = userPerms.staff;

        let {emailVerified} = await firebaseAdminUtils.auth().getUser(cookie.user_id);
        cookie.email_verified = emailVerified;

        try {
            cookies.set(project_id, JSON.stringify(cookie));
        } catch (error) {}

        if (!userPerms.admin && !userPerms.staff && !userPerms.rep) {
            throw redirect(303, '/account');
        }

        profileData = await firebaseAdminUtils.getDoc("customers", cookie.user_id);


    } else {
        throw redirect(303, '/account');
    }

    return {
        profile: profileData,
        cookies: cookie
    }
}