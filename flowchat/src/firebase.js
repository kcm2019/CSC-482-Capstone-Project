// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ0vn5y_YJ04veO1a-U2_VBWxAbaA6AFQ",
    authDomain: "auth-development-2c69c.firebaseapp.com",
    projectId: "auth-development-2c69c",
    storageBucket: "auth-development-2c69c.appspot.com",
    messagingSenderId: "165752276255",
    appId: "1:165752276255:web:30bad8255efdaf8ef81c2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app