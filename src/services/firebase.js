import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhdXkcFBy3U3b6vTdV7rcDI1HQywyLYrk",
    authDomain: "zapzap-5c642.firebaseapp.com",
    projectId: "zapzap-5c642",
    storageBucket: "zapzap-5c642.appspot.com",
    messagingSenderId: "382381362813",
    appId: "1:382381362813:web:6d508f19eebe2b800deb14"
  };

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };