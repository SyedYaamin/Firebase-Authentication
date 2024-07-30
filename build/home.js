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
const todoArr = [];
const todoBtn = document.querySelector("#todo-btn");
function renderTodoList() {
  lists.innerHTML = '';
  for (let i = 0; i < todoArr.length; i++) {
    lists.innerHTML += `<li>
                <div id="lists-text">
                    ${todoArr[i]}
                </div>
                <div id="lists-btn">
                    <button id="delete" onclick="todoDelete(${i})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <button id="edit" onclick="todoEdit(${i})">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                </div>
            </li>`;
  }
  todoInput.value = '';
}

todoBtn.addEventListener('click', () => {
  if (todoInput.value === "") {
    alert("Write Something");
  } else {
    lists.innerHTML = '';
    todoArr.push(todoInput.value);
    console.log(todoArr);
  }
  renderTodoList();
})

function todoDelete(index) {
  todoArr.splice(index, 1)
  renderTodoList();
}

function todoEdit(index) {
  const editedValue = prompt('Enter your new value');
  todoArr.splice(index, 1, editedValue);
  renderTodoList();
}
