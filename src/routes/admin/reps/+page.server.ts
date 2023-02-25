import {firebaseAdminUtils} from "../../api/_utils/firebase-admin-utils";

// @ts-ignore
export async function load({url, cookies}) {
    let reps = await firebaseAdminUtils.getCollectionArray("reps");

    reps = await Promise.all(reps.map(async (doc: any) => {
        let user = await firebaseAdminUtils.auth().getUser(doc.id);
        return { email: user.email, id: user.uid };
    }))

    return {
        reps
    }
}