import { decorate, observable, action } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import deviceStorage from "../utilities/deviceStorage";

class AuthStore {
  constructor() {
    this.user = null;
    this.error = null;
    this.isAuthenticated = false;
  }

  loginUser(userData, navigation) {
    console.log(userData);
    axios
      .post("http://coffee.q8fawazo.me/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.setCurrentUser(decoded);
        deviceStorage.saveToken(token);
        // Navigate to Main page
        navigation.navigate("CoffeeList");
      })
      .catch(err => {
        console.log(err);
      });
  }

  registerUser(userData, navigation) {
    axios
      .post("http://coffee.q8fawazo.me/api/register/", userData)
      .then(res => {
        this.loginUser(userData, navigation);
      })
      .catch(err => {
        console.log(err);
      });
  }
  setCurrentUser(decode) {
    this.isAuthenticated = true;
    this.user = decode;
  }
  setError(error) {
    this.error = error;
  }
  logoutUser(navigation) {
    this.user = null;
    this.error = null;
    this.isAuthenticated = false;
    deviceStorage.deleteJWT();
    navigation.navigate("CoffeeList");
    alert("Logged out successfully");
  }
}

decorate(AuthStore, {
  user: observable,
  error: observable,
  isAuthenticated: observable,
  loginUser: action,
  registerUser: action,
  setCurrentUser: action,
  setError: action,
  logoutUser: action
});

export default new AuthStore();
