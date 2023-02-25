import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    sendEmailVerification,
    deleteUser as deleteUserAccount,
    sendPasswordResetEmail
} from 'firebase/auth';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    getDocs,
    setDoc,
    serverTimestamp,
    deleteDoc,
    updateDoc,
    where,
    documentId
} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, deleteObject, listAll, getDownloadURL} from "firebase/storage";
import {getAnalytics} from "firebase/analytics";
import {get, writable} from "svelte/store";
import type IFirebase from "../../interfaces/IFirebase";
import type {FirebaseApp} from "@firebase/app";
import type {Analytics} from "@firebase/analytics";
import type {Firestore} from "@firebase/firestore";
import type {Auth} from "@firebase/auth";
import type {FirebaseStorage} from "@firebase/storage";
import { browser } from '$app/environment';
import {authStore} from "../../stores/auth";

function removeUndefined(obj: any) {
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {})
}

let app: FirebaseApp, analytics: Analytics, firestore: Firestore, auth: Auth, storage: FirebaseStorage;

function createFirebase() {
    if (typeof window === 'undefined') return;
    let config = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

    let defaultValue: IFirebase = {
        app,
        analytics,
        firestore,
        auth,
        storage,
        currentUser: undefined
    }

    const store = writable<IFirebase>(defaultValue);
    const {subscribe, set, update} = store;
    let updateStore = update;

    try {
        app = initializeApp(config, "[DEFAULT]")
        analytics = getAnalytics(app);
        firestore = getFirestore(app)
        auth = getAuth();
        storage = getStorage();

        set({app, analytics, firestore, auth, storage});
        console.log("FIREBASE CLIENT INITIALIZED.");
    } catch (error: any) {
        /*
         * We skip the "already exists" message which is
         * not an actual error when we're hot-reloading.
         */
        if (!/duplicate-app/u.test(error.message)) {
            console.error('Firebase initialization error', error.stack)
        }
    }

    const easyDoc = async (collectionName: string, docId: string) => {
        if (!firestore) return;
        const docRef: any = doc(firestore, collectionName, docId)
        const docSnap: any = await getDoc(docRef);
        if (docSnap.exists()) {
            return {...docSnap.data(), id: docId};
        }
    }

    const easySet = async (collectionName: string, docId: string, data: any) => {
        removeUndefined(data);
        delete data['id']
        await setDoc(doc(firestore, collectionName, docId), data);
        await updateDoc(doc(firestore, collectionName, docId), {
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        });
        return await easyDoc(collectionName, docId);
    }

    // this might not go past 10 ids
    const queryIds = async (collectionName: string, ids: [string]) => {
        const q = query(
            collection(firestore, collectionName),
            where(documentId(), "in", ids),
        );

        const productsDocsSnap = await getDocs(q);

        let result: any = []
        productsDocsSnap.forEach((doc) => {
            result.push({...doc.data(), id: doc.id})
        });
        return result;
    }

    return {
        subscribe, queryIds, auth, updateStore,
        toDate: (timestamp: any) => {
            if (!timestamp) return undefined;
            return timestamp["_seconds"] ? new Date(timestamp["_seconds"] * 1000) : new Date(timestamp.seconds * 1000);
        },
        uploadFile: async (data: any, path: string) => {
            await uploadBytes(ref(storage, path), data);
            return await getDownloadURL(ref(storage, path));
        },

        getFileURL: async (path: string) => {
            return await getDownloadURL(ref(storage, path));
        },

        deleteFile: async (path?: string, refer?:any) => {
            const fileRef = refer ? refer : ref(storage, path);
            return await deleteObject(fileRef);
        },

        listFiles: async (path: string) => {
            const listRef = ref(storage, path);
            const res = await listAll(listRef);
            return res.items;
        },
        createUser: async (email: string, password: string) => {
            return await createUserWithEmailAndPassword(auth, email, password);
        },

        deleteUser: async (user: any) => {
            return await deleteUserAccount(user);
        },

        updateUser: async (user: any, data: any, email?: string, password?: string) => {
            if (email) {
                await updateEmail(user, email);
            }
            if (password) {
                await updatePassword(user, password);
            }
            return await updateProfile(user, data);
        },

        sendVerificationEmail: async (user: any) => {
            return await sendEmailVerification(user);
        },

        sendPasswordResetEmail: async (email: string) => {
            return await sendPasswordResetEmail(auth, email);
        },

        signOut: async () => {
            let res = await signOut(auth);
            set(defaultValue);
            return res;
        },

        signIn: async (email: string, password: string) => {
            return await signInWithEmailAndPassword(auth, email, password);
        },

        collection: async (collectionName: string) => {
            const querySnapshot = await getDocs(query(collection(firestore, collectionName)));
            let result: any = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), id: doc.id})
            });
            return result;
        },

        query: async (collectionName: string, ...where: any) => {
            const q = query(collection(firestore, collectionName), ...where);
            const querySnapshot = await getDocs(q);
            let result: any = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), id: doc.id})
            });
            return result;
        },

        queryAdv: async (query: any) => {
            const querySnapshot = await getDocs(query);
            let result: any = []
            querySnapshot.forEach((doc: any) => {
                result.push({...doc.data(), id: doc.id})
            });
            return result;
        },

        getSnapshot: async (query: any) => {
            const querySnapshot = await getDocs(query);
            let result: any = []
            querySnapshot.forEach((doc) => {
                result.push({id: doc.id})
            });
            return result;
        },

        doc: async (collectionName: string, docId: string) => {
            return await easyDoc(collectionName, docId);
        },

        set: async (collectionName: string, docId: string, data: any) => {
            return await easySet(collectionName, docId, data);
        },

        add: async (collectionName: string, data: any) => {
            removeUndefined(data);
            delete data['id']
            let docRef = await addDoc(collection(firestore, collectionName), data);

            await updateDoc(doc(firestore, collectionName, docRef.id), {
                created_at: serverTimestamp()
            });
            return await easyDoc(collectionName, docRef.id);
        },

        update: async (collectionName: string, docId: string, data: any) => {
            try {
                removeUndefined(data);
                await updateDoc(doc(firestore, collectionName, docId), {...data, updated_at: serverTimestamp()});
                return await easyDoc(collectionName, docId);
            } catch (e) {
                return await easySet(collectionName, docId, data);
            }
        },

        delete: async (collectionName: string, docId: string) => {
            return await deleteDoc(doc(firestore, collectionName, docId));
        }
    }
}

export const firebaseClientUtils = createFirebase();


