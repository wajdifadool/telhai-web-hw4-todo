import AuthApi from '../services/auth.js';
import Storage from '../utils/Storage.js';

class LoginFrom {
  constructor() {
    this._form = document.querySelector('form');
    this._email = document.getElementById('email');
    this._password = document.getElementById('password');

    // handle  loginn signup  cllicks i added them here to tacke car of backstack istoroy
    this._btnLogIn = document.getElementById('btn-login');
    this._btnSignUp = document.getElementById('btn-signup');

    this.addEventListeners();

    // Check if user found , if so, just redirect to Todos.Html
    if (Storage.getUser()) {
      console.log('user do Exists');
      // redircet
      history.replaceState(null, '', '../pages/todos.html');
      window.location.href = '../pages/todos.html';
    }
  }
  // add evenet Listert

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
    this._btnSignUp.addEventListener('click', () => {
      console.log('ASd asf jasdjfk');
      // make o delete the stack history
      // Redirect the user to the todos page
      history.replaceState(null, '', '../pages/register.html');
      window.location.href = '../pages/register.html';
    });

    this._btnLogIn.addEventListener('click', () => {
      // make o delete the stack history
      history.replaceState(null, '', '../pages/login.html');
      window.location.href = '../pages/login.html';
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const valid = this._validateForm();

    if (valid) {
      // ok form is valid
      const user = {
        email: this._email.value,
        password: this._password.value,
      };

      try {
        const myUser = await AuthApi.getUser(user);
        // console.log(myUser);

        console.log(myUser);
        Storage.saveUser(myUser.data.user);
        console.log('Login succsful');
        //TODO:  handle seesion storage
        // open todo pages
        // Redirect the user to the todos page
        history.replaceState(null, '', '../pages/todos.html');
        window.location.href = '../pages/todos.html';

        // Replace the current URL in the history stack
      } catch (error) {
        if (error.response.status === 401) {
          this._setErrorFor('worng credinatls');
        } else {
          this._setErrorFor('something went worng :(');
        }
        // Clear From
        this._email.value = '';
        this._password.value = '';
      }

      // open new page

      // Save To local Stroage user credintals,
      //   Storage.saveUser(newUser.data.user);
      // TODO: seestion Stroage :
      //   window.location.href = '/frontend/public/pages/todos.html';

      // console.log('newUser created');
      // console.log(newUser.data.user);
      // console.log(typeof newUser.data.user);
    }
  }

  _validateForm() {
    // Check if email is empty
    if (this._email.value.trim() === '') {
      this._setErrorFor('Email cannot be blank');
      return false;
    }
    if (!this._isEmail(this._email.value.trim())) {
      this._setErrorFor('Not a valid email address');
      return false;
    }

    // Check if password is empty
    if (this._password.value.trim() === '') {
      this._setErrorFor('Password cannot be blank');
      return false;
    }

    return true;
  }

  _isEmail(email) {
    // Regular expression for basic email validation
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  }

  _setErrorFor(message) {
    document.querySelector('#error').innerText = message;
  }
}

new LoginFrom();
