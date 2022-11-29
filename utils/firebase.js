// Import the functions you need from the SDKs you need
import * as dotenv from 'dotenv';
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config()

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

{/* 
console.log(process.env.NEXT_PUBLIC_API_KEY);
console.log(process.env.NEXT_PUBLIC_AUTH_DOMAIN);
console.log(process.env.NEXT_PUBLIC_PROJECT_ID);
console.log(process.env.NEXT_PUBLIC_STORAGE_BUCKET);
console.log(process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID);
console.log(process.env.NEXT_PUBLIC_APP_ID);
console.log(process.env.NEXT_PUBLIC_MEASUREMENT_ID);
console.log(process.env);
*/}

// Initialize Firebase
const createFirebaseApp = (config) => {
  try {
    return initializeApp(config);
  } catch (e) {
    return getApp();
  }
}
const app = createFirebaseApp(firebaseConfig);

// Initialize Firebase Auth and get reference to the service
export const auth = getAuth();
export const db = getFirestore(app);

