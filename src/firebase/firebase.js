import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(config);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

const firestore = firebaseApp.firestore();

export { firebaseAppAuth, providers, firestore };
