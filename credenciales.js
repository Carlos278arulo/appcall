// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaTQiTE1KV9vQwZLH0FzMCEaa90Awk3_c",
  authDomain: "login-47c0c.firebaseapp.com",
  projectId: "login-47c0c",
  storageBucket: "login-47c0c.appspot.com",
  messagingSenderId: "168635855226",
  appId: "1:168635855226:web:a415968cdb5c8062f966c3"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase