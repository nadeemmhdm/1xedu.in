
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyBODXiKdzzbQtHFUvdcUkimCreUrvbu1Vs",
    authDomain: "teste-77bc3.firebaseapp.com",
    databaseURL: "https://teste-77bc3-default-rtdb.firebaseio.com",
    projectId: "teste-77bc3",
    storageBucket: "teste-77bc3.firebasestorage.app",
    messagingSenderId: "272417985635",
    appId: "1:272417985635:web:fe962e96c93c9f0d339456",
    measurementId: "G-G4FHY4DT4Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
export default app;
