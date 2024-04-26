import AuthApi from '../services/auth.js';
import Storage from '../utils/Storage.js';
class RegisterForm {
  constructor() {
    // Check if user found , if so, just redirect to Todos.Html
    if (Storage.getUser()) {
      console.log('user do Exists');
      // redircet
      history.replaceState(null, '', '/frontend/public/pages/todos.html');
      window.location.href = '/frontend/public/pages/todos.html';
    }

    this._form = document.querySelector('form');
    this._username = document.getElementById('username');
    this._email = document.getElementById('email');
    this._password = document.getElementById('password');
    this._confirm_password = document.getElementById('confirm_password');

    this._btnLogIn = document.getElementById('btn-login');
    this._btnSignUp = document.getElementById('btn-signup');

    this.addEventListeners();
  }
  // add evenet Listert

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));

    this._btnSignUp.addEventListener('click', () => {
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

    console.log('valid');
    console.log(valid);
    if (valid) {
      // ok form is valid
      const user = {
        username: this._username.value,
        email: this._email.value,
        password: this._password.value,
      };

      try {
        const newUser = await AuthApi.setUser(user);

        // open new page
        // Save To local Stroage user credintals,
        Storage.saveUser(newUser.data.user);
        // TODO: seestion Stroage :
        history.replaceState(null, '', '/frontend/public/pages/todos.html');
        window.location.href = '/frontend/public/pages/todos.html';
      } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
          this._setErrorFor('This Email is already registered!');
          // clear form

          this._password.value = '';
          this._username.value = '';
          this._password.value = '';
          this._confirm_password.value = '';
        }
        return;
      }

      // console.log('newUser created');
      // console.log(newUser.data.user);
      // console.log(typeof newUser.data.user);
    }
  }

  _validateForm() {
    // Check if username is empty
    if (this._username.value.trim() === '') {
      this._setErrorFor('Username cannot be blank');
      return false;
    }

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
    if (this._password.value.trim().length < 7) {
      this._setErrorFor('password must be at least 8 charechters');

      return false;
    }

    // Check if confirm password is empty
    if (this._confirm_password.value.trim() === '') {
      this._setErrorFor('Confirm Password cannot be blank');
      return false;
    }
    if (this._password.value.trim() !== this._confirm_password.value.trim()) {
      this._setErrorFor('Passwords do not match');
      return false;
    }

    return true;
  }

  _setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = ''; // Clear error message
  }

  _isEmail(email) {
    // Regular expression for basic email validation
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  }

  _setErrorFor(message) {
    document.querySelector('#error').innerText = message;
  }
}

new RegisterForm();
