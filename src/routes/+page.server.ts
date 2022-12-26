import type {ICookie} from "./+layout.server";
import {project_id} from "./+layout.server";
import {redirect} from "@sveltejs/kit";

export const actions = {
    // @ts-ignore
    enter: async ({request, cookies}) => {
        const cookie: ICookie = JSON.parse(cookies.get(project_id));
        cookie.is18 = true;
        cookies.set(project_id, JSON.stringify(cookie));

        throw redirect(303, '/');
    }
};