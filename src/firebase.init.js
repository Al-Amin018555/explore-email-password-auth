// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBECaNdaoX-A4rEWiaFAlnNbsdVq0_XLsM",
    authDomain: "explore-email-pass-auth-f3a2a.firebaseapp.com",
    projectId: "explore-email-pass-auth-f3a2a",
    storageBucket: "explore-email-pass-auth-f3a2a.firebasestorage.app",
    messagingSenderId: "768904466461",
    appId: "1:768904466461:web:99869fcc9b26c21610f6f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);