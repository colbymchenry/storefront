import admin from 'firebase-admin';
import {config} from "dotenv";

config()

function createFirebase() {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(process?.env?.FIREBASE_CONFIG || "{}")),
        })

        admin.firestore().settings({
            timestampsInSnapshots: true,
            ignoreUndefinedProperties: true
        })
    } catch (error: any) {
        /*
         * We skip the "already exists" message which is
         * not an actual error when we're hot-reloading.
         */
        if (!/already exists/u.test(error.message)) {
            console.error('Firebase admin initialization error', error.stack)
        }
    }

    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    function firestore() {
        return admin.firestore();
    }

    function serverTimestamp() {
        return admin.firestore.FieldValue.serverTimestamp();
    }

    function auth() {
        return admin.auth();
    }

    function toTimestamp(date: string) {
        return admin.firestore.Timestamp.fromDate(new Date(date));
    }

    function toDate(timestamp: any) {
        return new Date(timestamp.seconds * 1000);
    }

    async function getCollectionArray(collection: string) {
        const querySnapshot = await firestore().collection(collection).get();
        let result: any = []
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), id: doc.id})
        });
        return result;
    }

    async function query(q: any) {
        let snapshot = await q.get();
        let results: any = [];
        snapshot.forEach((doc: any) => {
            results.push({...doc.data(), id: doc.id});
        })
        return results;
    }

    async function getDoc(collection: string, docId: string) {
        return (await (await firestore().collection(collection).doc(docId).get()).data());
    }

    return {
        query, getDoc, firestore, passwordRegex, serverTimestamp, auth, toTimestamp, toDate, getCollectionArray
    }

}

export const firebaseAdminUtils = createFirebase();