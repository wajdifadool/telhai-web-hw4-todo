class ToDoApi {
  constructor() {
    // make sure our api is on port 8000
    this._apiUrl = 'http://localhost:5000/api/todos';
  }
  getTodos(userId) {
    try {
      return axios.get(`${this._apiUrl}/${userId}`);
    } catch (error) {
      console.log(`erorr getTodos:${res}`);
    }
  }

  createTodo(userId, todo) {
    return axios.post(`${this._apiUrl}/${userId}`, todo);
  }
  //TODO: make an upddate to do
  //   updateTodo(id, data) {
  //     return axios.put(`${this._apiUrl}/${id}`, data);
  //   }

  deleteTodo(userId, itemId) {
    return axios.delete(`${this._apiUrl}/${userId}/${itemId}`);
  }
}

export default new ToDoApi();
