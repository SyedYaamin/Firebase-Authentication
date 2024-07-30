import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const forgotPassword = document.querySelector("#forgot-password");

form.addEventListener('submit', (event)=> {
  event.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      window.location = "home.html";
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

forgotPassword.addEventListener ('click' , (event)=>{
  event.preventDefault();

  sendPasswordResetEmail(auth, email.value)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})