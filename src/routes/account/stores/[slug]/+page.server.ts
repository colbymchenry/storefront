import {firebaseAdminUtils} from "../../../api/_utils/firebase-admin-utils";

export async function load(req: any) {
    if (req.params.slug && req.params.slug !== "new") {
        let store = await firebaseAdminUtils.getDoc("stores", req.params.slug);
        store["id"] = req.params.slug;
        return {
            store
        }
    }
    return {
        "new": true
    };
}