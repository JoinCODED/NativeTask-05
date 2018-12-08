import React, { Component } from "react";
import { observer } from "mobx-react";
import { withNavigation } from "react-navigation";

// NativeBase Components
import { Text, Footer, Button, FooterTab } from "native-base";

// Style
import styles from "./styles";

// Store
import AuthStore from "../../store/AuthStore";

class CoffeeFooter extends Component {
  loginButton() {
    return (
      <Button
        transparent
        full
        onPress={() => this.props.navigation.navigate("Login")}
      >
        <Text style={styles.text}>Login</Text>
      </Button>
    );
  }

  logoutButton() {
    return (
      <Button
        transparent
        full
        onPress={() => AuthStore.logoutUser(this.props.navigation)}
      >
        <Text style={styles.text}>Logout</Text>
      </Button>
    );
  }

  render() {
    return (
      <Footer style={styles.transparent}>
        <FooterTab>
          {AuthStore.isAuthenticated ? this.logoutButton() : this.loginButton()}
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(observer(CoffeeFooter));
