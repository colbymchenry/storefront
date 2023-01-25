import {firebaseAdminUtils} from "../../../api/_utils/firebase-admin-utils";

export async function load(req: any) {
    if (req.params.slug) {
        let ticket = await firebaseAdminUtils.getDoc("tickets", req.params.slug);
        ticket["id"] = req.params.slug;
        ticket["created_at"] = firebaseAdminUtils.toDate(ticket["created_at"])

        let store = await firebaseAdminUtils.getDoc("stores", ticket.storeId);
        let user = await firebaseAdminUtils.auth().getUser(ticket.user_id);

        ticket["store"] = store.storeName;
        ticket["email"] = user.email;

        let query = firebaseAdminUtils.firestore().collection("ticket-messages").where("ticket_id", "==", req.params.slug);
        let messages = await firebaseAdminUtils.query(query);

        messages = await Promise.all(messages.map(async (message: any) => {
            if (message?.created_at) {
                message["created_at"] = firebaseAdminUtils.toDate(message["created_at"])
            }
            return message;
        }));

        return {
            ticket, messages
        }
    }
    return {
        "new": true
    };
}