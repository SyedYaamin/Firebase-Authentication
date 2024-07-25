import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";
const logoutBtn = document.querySelector("#Logout-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

  } else {
    window.location = "login.html";
  }
});


logoutBtn.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
      alert("Logout Successfully!!");
      window.location = "login.html";
    }).catch((error) => {
      // An error happened.
    });
})