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
import AuthStore from "../../store/authStore";

class HomePage extends Component {
  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}

export default HomePage;
