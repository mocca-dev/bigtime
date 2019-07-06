import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(config);

const firebaseAppAuth = firebaseApp.auth();

const firestore = firebaseApp.firestore();
firestore.enablePersistence();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

const doSignInWithGoogle = () =>
  firebaseAppAuth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      return firebaseApp
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    })
    .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });

const sendSignInLinkToEmail = (email, actionCodeSettings) =>
  firebaseAppAuth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      return firebaseApp
        .auth()
        .sendSignInLinkToEmail(email, actionCodeSettings);
    });

const doSignInWithEmailLink = (email, fullUrl) =>
  firebaseAppAuth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      return firebaseApp.auth().signInWithEmailLink(email, fullUrl);
    });

export {
  firebaseAppAuth,
  providers,
  firestore,
  doSignInWithGoogle,
  sendSignInLinkToEmail,
  doSignInWithEmailLink,
  firebase
};
