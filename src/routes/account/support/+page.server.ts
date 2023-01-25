import {firebaseAdminUtils} from "../../api/_utils/firebase-admin-utils";
import type ICookie from "$lib/interfaces/ICookie";
import {project_id} from "$lib/stores/cookies";

// @ts-ignore
export async function load({url, cookies}) {
    let cookie: ICookie = JSON.parse(cookies.get(project_id));

    let tickets: any = {
    };

    if (cookie?.user_id && cookie?.authenticated) {
        let query = firebaseAdminUtils.firestore().collection("tickets").where("user_id", "==", cookie.user_id);
        tickets = await firebaseAdminUtils.query(query);

        tickets = await Promise.all(tickets.map(async (ticket: any) => {
            let store = await firebaseAdminUtils.getDoc("stores", ticket.storeId);
            let user = await firebaseAdminUtils.auth().getUser(ticket.user_id);
            ticket["store"] = store.storeName;
            ticket["email"] = user.email;
            if (ticket?.created_at) {
                ticket["created_at"] = firebaseAdminUtils.toDate(ticket["created_at"])
            }
            return ticket;
        }));
    }

    return {
        tickets
    }
}