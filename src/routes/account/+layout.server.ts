import {project_id} from "$lib/stores/cookies";
import type ICookie from "$lib/interfaces/ICookie";
import {firebaseAdminUtils} from "../api/_utils/firebase-admin-utils";
import {redirect} from "@sveltejs/kit";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let profileData: any = {
    };

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

        if (userPerms.admin || userPerms.rep || userPerms.staff) {
            throw redirect(303, '/admin');
        }

        let {emailVerified} = await firebaseAdminUtils.auth().getUser(cookie.user_id);
        cookie.email_verified = emailVerified;

        try {
            cookies.set(project_id, JSON.stringify(cookie));
        } catch (error) {
            console.error(error);
        }

        profileData = await firebaseAdminUtils.getDoc("customers", res.uid);
    } else {
        throw redirect(303, '/');
    }

    return {
        profile: profileData,
        cookies: cookie
    }
}