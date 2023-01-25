import {fail, redirect} from "@sveltejs/kit";
import {firebaseAdminUtils} from "./api/_utils/firebase-admin-utils";
import type ICookie from "../lib/interfaces/ICookie";
import {project_id} from "../lib/stores/cookies";

export const actions = {
    // @ts-ignore
    enter: async ({request, cookies}) => {
        const cookie: ICookie = JSON.parse(cookies.get(project_id) || "{}");
        cookie.is18 = true;
        cookies.set(project_id, JSON.stringify(cookie));
        throw redirect(303, '/');
    },
    // @ts-ignore
    authenticate: async ({request, cookies}) => {
        let cookie: ICookie;
        try {
            cookie = JSON.parse(cookies.get(project_id) || "{}");
        } catch (error) {
            cookie = {
                authenticated: false,
                categories: undefined,
                idToken: "",
                is18: false
            };
        }
        const data = await request.formData();
        try {
            let res = await firebaseAdminUtils.auth().verifyIdToken(request.headers.get("idtoken"));
            cookie.authenticated = true;
            cookie.idToken = data.get("idToken");
            cookie.email = res.email;
            cookie.email_verified = res.email_verified;
            cookie.user_id = res.user_id;
        } catch (error) {
            cookie.authenticated = false;
            throw fail(400);
        }

        cookies.set(project_id, JSON.stringify(cookie));
        throw redirect(303, '/');
    },
    // @ts-ignore
    logout: async ({request, cookies}) => {
        let cookie = JSON.parse(cookies.get(project_id) || "{}");
        delete cookie["authenticated"];
        delete cookie["idToken"];
        delete cookie["email"];
        delete cookie["email_verified"];
        delete cookie["user_id"];
        cookies.set(project_id, JSON.stringify(cookie));
        throw redirect(303, '/');
    }
};