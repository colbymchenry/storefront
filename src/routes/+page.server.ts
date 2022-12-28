import {project_id} from "./+layout.server";
import {fail, redirect} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../lib/utils/firebase/firebase-admin-utils";
import type ICookie from "../lib/interfaces/ICookie";

export const actions = {
    // @ts-ignore
    enter: async ({request, cookies}) => {
        const cookie: ICookie = JSON.parse(cookies.get(project_id));
        cookie.is18 = true;
        cookies.set(project_id, JSON.stringify(cookie));
        throw redirect(303, '/');
    },
    // @ts-ignore
    authenticate: async ({request, cookies}) => {
        const cookie: ICookie = JSON.parse(cookies.get(project_id));
        const data = await request.formData();

        try {
            await firebaseAdminUtils.auth().verifyIdToken(data.get("idToken"));
            cookie.authenticated = true;
            cookie.idToken = data.get("idToken");
        } catch (error) {
            cookie.authenticated = false;
            throw fail(400);
        }

        cookies.set(project_id, JSON.stringify(cookie));
        throw redirect(303, '/');
    }
};