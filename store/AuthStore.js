import { decorate, observable, action } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

class AuthStore {
  constructor() {
    this.user = null;
    this.error = null;
    this.isAuthenticated = false;

    this.checkForToken();
  }

  setAuthToken(token) {
    if (token) {
      return AsyncStorage.setItem("token", token)
        .then(
          () => (axios.defaults.headers.common.Authorization = `JWT ${token}`)
        )
        .then(() => this.setCurrentUser(token));
    } else {
      return AsyncStorage.removeItem("token")
        .then(() => delete axios.defaults.headers.common.Authorization)
        .then(() => this.setCurrentUser());
    }
  }

  setCurrentUser(token) {
    if (token) {
      // Decode token to get user data
      const user = jwt_decode(token);
      this.isAuthenticated = true;
      this.user = user;
    } else {
      this.user = null;
      this.error = null;
      this.isAuthenticated = false;
    }
  }

  checkForToken() {
    return AsyncStorage.getItem("token").then(token => {
      if (token) {
        const currentTime = Date.now() / 1000;
        const user = jwt_decode(token);
        if (user.exp > currentTime) {
          this.setAuthToken(token);
        } else {
          this.logout();
        }
      }
    });
  }

  loginUser(userData, navigation) {
    console.log(userData);
    axios
      .post("http://coffee.q8fawazo.me/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Set current user
        this.setAuthToken(token).then(() =>
          // Navigate to coffe list after successful login
          navigation.navigate("CoffeeList")
        );
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

  logoutUser(navigation) {
    this.setAuthToken()
      .then(() => navigation.navigate("CoffeeList"))
      .catch(err => {
        console.log(err);
      });
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
  logoutUser: action
});

let authStore = new AuthStore();

export default authStore;
