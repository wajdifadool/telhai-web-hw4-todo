class Storage {
  // getUSer
  // setUser
  // getTOdos
  // deleteToddo
  // udaeTOd

  /**
   * Get todos from localStorage.
   * @returns {Array<Object>} An array of todo objects from local Stroage.
   */
  static getTodos() {
    return localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
  }

  /**
   * Save todos Json String to  localStorage.
   */
  static setTodos(todosJSON) {
    localStorage.setItem('todos', todosJSON);
  }

  static pushTodo(todoObject) {
    // Get existing todos from localStorage
    let todos = this.getTodos();

    // Push the new todo object to the array
    todos.push(todoObject);

    // Set the updated todos array back to localStorage
    this.setTodos(JSON.stringify(todos));
  }

  /**
   * Delete a todo item from the existing list of todos in localStorage.
   * @param {number} todoId The id of the todo item to delete.
   */
  static deleteTodo(todoId) {
    /**
     * Get existing todos from localStorage.
     * @type {Array<Object>}
     */
    let todos = Storage.getTodos();

    // Filter out the todo object with the specified id
    todos = todos.filter((todo) => todo._id !== todoId);
    console.log('todos are now ');
    console.log(todos);

    // Set the updated todos array back to localStorage
    this.setTodos(JSON.stringify(todos));
  }

  /**
   * Get user data from localStorage.
   * @returns {Object | null} The user data if found, or null if not found.
   */
  static getUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
  }
  /**
   * Save user data to localStorage.
   * @param {Object} userData The user data to save.
   */
  static saveUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  static clear() {
    localStorage.removeItem('user');
    localStorage.removeItem('todos');
  }
}
export default Storage;
