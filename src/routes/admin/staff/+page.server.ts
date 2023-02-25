import {firebaseAdminUtils} from "../../api/_utils/firebase-admin-utils";

// @ts-ignore
export async function load({url, cookies}) {
    let staff = await firebaseAdminUtils.getCollectionArray("staff");

    staff = await Promise.all(staff.map(async (doc: any) => {
        let user = await firebaseAdminUtils.auth().getUser(doc.id);
        return { email: user.email, id: user.uid };
    }))

    return {
        staff
    }
}