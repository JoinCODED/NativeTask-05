import React, { Component } from "react";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Navigation
import Nav from "../Navigation";

// deviceStorage
import deviceStorage from "../../utilities/deviceStorage";
import jwt_decode from "jwt-decode";

//Store
import AuthStore from "../../store/AuthStore";

class HomePage extends Component {
  componentDidMount() {
    deviceStorage
      .getToken()
      .then(value => this.handleToken(value))
      .catch(err => null);
  }

  handleToken(token) {
    if (token) {
      const decoded = jwt_decode(token);
      AuthStore.setCurrentUser(decoded);
    }
  }
  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}

export default HomePage;
