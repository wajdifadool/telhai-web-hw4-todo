// Downloadded from the Moodle, Writen by Gadi
// updaed to the requirments of the home work by wajde
// couldve do some classes & better structure, but why bother  :)
import Storage from '../utils/Storage.js';
import ToDoApi from '../services/TodoApi.js';
// grab all elements
const form = document.querySelector('[data-form]'); //By Attribute
const lists = document.querySelector('[data-lists]');
const input = document.querySelector('[data-input]');
const logoutBtn = document.querySelector('#btn-logout');

// Check if user found , if so, just redirect to Todos.Html
if (!Storage.getUser()) {
  history.replaceState(null, '', '../pages/login.html');
  window.location.href = '../pages/login.html';
}

//--keep array Global fo UI variable fo UI Display
let todoArr = [];
let user = {};
//once the browser is loaded
window.addEventListener('DOMContentLoaded', async () => {
  //-When Page Loaded Get All Items from Local Storage

  // get user
  user = Storage.getUser();
  const { email, username, _id } = user;
  console.log(user);
  UI.greetUser(username, email);
  // Fetch User todos using the api
  const myRes = await ToDoApi.getTodos(_id);
  todoArr = myRes.data;

  // save the ddownloaded data tot local Storage
  Storage.setTodos(JSON.stringify(todoArr));

  // render the dat
  //--Display Data According Loaded Array
  UI.displayData();
  //register remove from the dom
  UI.registerRemoveTodo();
});

logoutBtn.addEventListener('click', () => {
  // logout uhsser and clear strroage
  // clear Storage
  Storage.clear();

  history.replaceState(null, '', '../pages/login.html');
  window.location.href = '../pages/login.html';
});

//Submit
form.addEventListener('submit', async (e) => {
  //Disble continue sumit processing...
  e.preventDefault();

  // TODO:  input  validation
  const title = input.value;
  if (title.trim() === '') {
    return;
  }

  // push to DataBase
  const myRes = await ToDoApi.createTodo(
    // push to do to DB
    user._id,
    { title: title }
  );
  // console.log('myRes.data');
  // console.log(myRes.data.todo);

  // ok i has een pushhed o the databse
  // save to local Storage
  // TODO: response validation

  const todoObj = myRes.data.todo;
  Storage.pushTodo(todoObj);

  // rerender the UI
  // const todo = new Todo(myRes.data.todo);

  // todoArr.push(todo);
  todoArr = [...todoArr, myRes.data.todo];

  UI.displayData();
  UI.clearInput();
});

//Handle UI Operation
class UI {
  //--Go Over All Array Elements
  //--And Generate HTML Items Dynamically
  static displayData() {
    //-Generate Html
    //-each Delete Icon Injected with
    //--data-id = {id of the object}

    let displayData = todoArr.map((item) => {
      // console.log(item);
      return `
                <div class="todo">
                <p>${item.title}</p>
                <span class="remove" data-id = ${item._id}>🗑️</span>
                </div>
            `;
    });
    //--Put generated html in a container
    lists.innerHTML = displayData.join(' ');
  }

  //--Clear Input Element
  static clearInput() {
    input.value = '';
  }

  //--Remove Element When Clicked
  static registerRemoveTodo() {
    //--Register Click  For Deleting a toto row
    //--The Click is on the List Div Container

    lists.addEventListener('click', async (e) => {
      if (e.target.classList.contains('remove')) {
        //Get Id of clicked delete
        let btnId = e.target.dataset.id;
        //--Remove Element From HTML DOM
        // -- Remove From the Data Base
        const myRes = await ToDoApi.deleteTodo(user._id, btnId);

        if (myRes.status === 200) {
          // console.log('message deleted successfuly');
          // Delete form Sorage
          Storage.deleteTodo(btnId);
          // reRnder the ui

          //remove from array.
          UI.removeArrayTodo(btnId, e.target);
        }
      }
    });
  }

  //Remove Element From UI And Update LocalStorage
  static removeArrayTodo(id, elementClicked) {
    elementClicked.parentElement.remove();
    todoArr = todoArr.filter((item) => item._id !== id);
  }

  static greetUser(username, email) {
    const now = new Date();
    const hour = now.getHours();

    let greeting;

    if (hour >= 6 && hour < 12) {
      greeting = `Good morning, ${username}!`;
    } else if (hour >= 12 && hour < 18) {
      greeting = `Good afternoon, ${username}!`;
    } else {
      greeting = `Good evening, ${username}!`;
    }

    document.getElementById('greeting').textContent = greeting;
    document.getElementById('login').textContent = email;
  }
}
