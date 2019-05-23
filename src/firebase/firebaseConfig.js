import * as firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBTFQ2YkXE5e7IgGWyoQ1ZnfTShXCoXDLw",
  authDomain: "big-time-mobile.firebaseapp.com",
  databaseURL: "https://big-time-mobile.firebaseio.com",
  projectId: "big-time-mobile",
  storageBucket: "big-time-mobile.appspot.com",
  messagingSenderId: "485729800632",
  appId: "1:485729800632:web:92961eb5583b5a8f"
};

const firebaseApp = firebase.initializeApp(config);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export { firebaseAppAuth, providers };
