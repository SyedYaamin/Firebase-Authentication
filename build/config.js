import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC71RWAx4dARZpKneCJvSrazNChpWB_08w",
    authDomain: "registration-form-ab106.firebaseapp.com",
    projectId: "registration-form-ab106",
    storageBucket: "registration-form-ab106.appspot.com",
    messagingSenderId: "116145499491",
    appId: "1:116145499491:web:a9b15e51ef291694ba3756"
  };

  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);