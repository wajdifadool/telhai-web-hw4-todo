class AuthApi {
  constructor() {
    // make sure our api is on port 8000
    this._apiUrl = 'http://localhost:8000';
  }
  getUser(user) {
    return axios.post(`${this._apiUrl}/signin`, user);
  }
  // Create new user
  setUser(user) {
    return axios.post(`${this._apiUrl}/signup`, user);
  }
}

export default new AuthApi();
