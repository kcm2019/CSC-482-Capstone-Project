// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA_A-FBxT1fUfDAqZgMSHnz2HlFloVC8w",
    authDomain: "flowchat-2c64d.firebaseapp.com",
    projectId: "flowchat-2c64d",
    storageBucket: "flowchat-2c64d.appspot.com",
    messagingSenderId: "561630818558",
    appId: "1:561630818558:web:2eab06109dafc07d2035af"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app