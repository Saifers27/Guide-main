import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAqZqXf8_5Zbg6beiMuJ60XYtHfsw_kRI",
  authDomain: "newguide-430a0.firebaseapp.com",
  projectId: "newguide-430a0",
  storageBucket: "newguide-430a0.firebasestorage.app",
  messagingSenderId: "712764557441",
  appId: "1:712764557441:web:8b4e69e9da70929aa86580",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
