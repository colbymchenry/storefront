import type {FirebaseApp} from "@firebase/app";
import type {Analytics} from "@firebase/analytics";
import type {Firestore} from "@firebase/firestore";
import type {Auth, User} from "@firebase/auth";
import type {FirebaseStorage} from "@firebase/storage";

export default interface IFirebase {
    app?: FirebaseApp;
    analytics?: Analytics;
    firestore?: Firestore;
    auth?: Auth;
    storage?: FirebaseStorage;
    currentUser?: User;
}