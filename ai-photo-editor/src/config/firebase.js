// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBU0RzfYrMUqcRjDJ8ozyh1lOS2GPbKJLc",
    authDomain: "ai-photo-editor-14f0a.firebaseapp.com",
    projectId: "ai-photo-editor-14f0a",
    storageBucket: "ai-photo-editor-14f0a.appspot.com",
    messagingSenderId: "310381514261",
    appId: "1:310381514261:web:da48ff959af0dd2c3a881c",
    measurementId: "G-EFYHKGQ8SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics }