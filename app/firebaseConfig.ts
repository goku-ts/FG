// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkTyJYhRc9LYsbUzoZMkfuj0KbMdOS8hc",
    authDomain: "farm-gate-bcdbc.firebaseapp.com",
    projectId: "farm-gate-bcdbc",
    storageBucket: "farm-gate-bcdbc.appspot.com",
    messagingSenderId: "434809757223",
    appId: "1:434809757223:web:2334930a42528d46f6b802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app