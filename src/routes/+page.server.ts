import type {ICookie} from "./+layout.server";
import {project_id} from "./+layout.server";
import {redirect} from "@sveltejs/kit";
import {firebaseAdminUtils} from "../lib/utils/firebase/firebase-admin-utils";

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
        } catch (error) {
            cookie.authenticated = false;
        }

        cookies.set(project_id, JSON.stringify(cookie));
        throw redirect(303, '/');
    }
};