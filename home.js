import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, Timestamp, query, orderBy, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { auth, db } from "./config.js";

const logoutBtn = document.querySelector("#Logout-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

  } else {
    window.location = "login.html";
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert("Logout Successfully!!");
    window.location = "login.html";
  }).catch((error) => {
    // An error happened.
  });
})

const todoInput = document.querySelector("#input");
const lists = document.querySelector("#lists");
let todoArr = [];
const todoBtn = document.querySelector("#todo-btn");

const getData = async () => {
  todoArr = [];
  const q = query(collection(db, "users"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    todoArr.push({ ...doc.data(), id: doc.id });
  });
  renderTodoList();
}
getData();


const renderTodoList = async () => {
  lists.innerHTML = '';

  if (todoArr.length === 0) {
    lists.innerHTML = `<li>No Data Found!</li>`;
    return;
  }

  todoArr.map((item) => {
    lists.innerHTML += `
      <li>
          <div id="lists-text">
            ${item.todo}
          </div>
          <div id="lists-btn">
          <button id="delete">
              <i class="fa-solid fa-xmark"></i>
          </button>
          <button id="edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          </div>
      </li>
      `;

  });
  const delBtn = document.querySelectorAll("#delete");
  const editBtn = document.querySelectorAll("#edit");

  delBtn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      todoArr.splice(index, 1);
      await deleteDoc(doc(db, "users", todoArr[index].id));
      console.log("Data deleted");
      window.location.reload();
    });
  });

  editBtn.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      const updatedNewValue = prompt("enter new value");
      const todoUpdate = doc(db, "users", todoArr[index].id);
      await updateDoc(todoUpdate, {
        todo: updatedNewValue,
      });
      console.log("Data updated");
      todoArr[index].todo = updatedNewValue;
      window.location.reload();
    });
  });
}
renderTodoList();

todoBtn.addEventListener('click', async (event) => {
  lists.innerHTML = '';
  event.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "users"), {
      todo: todoInput.value,
      time: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    todoArr.push({
      todo: todo.value,
      id: docRef.id,
    });
    renderTodoList();
    todoInput.value = '';
    window.location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});