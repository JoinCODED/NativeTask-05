import React, { Component } from "react";
import { Keyboard } from "react-native";

// NativeBase Components
import {
  Text,
  Button,
  Body,
  List,
  ListItem,
  Form,
  Label,
  Input,
  Item,
  Content,
  Header
} from "native-base";
//Store
import AuthStore from "../../store/authStore";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "Login"
  };

  handleLogin() {
    const { username, password } = this.state;
    const { navigation } = this.props;
    AuthStore.loginUser(
      {
        username: username,
        password: password
      },
      navigation
    );
    Keyboard.dismiss();
  }

  handleRegister() {
    const { username, password } = this.state;
    const { navigation } = this.props;
    AuthStore.registerUser(
      {
        username: username,
        password: password
      },
      navigation
    );
    Keyboard.dismiss();
  }

  render() {
    const { username, password } = this.state;

    return (
      <Content>
        <Header transparent />
        <List>
          <ListItem style={{ borderBottomWidth: 0 }}>
            <Body>
              <Form>
                <Body>
                  <Label style={{ color: "white" }}>Username</Label>
                </Body>
                <Item
                  rounded
                  style={{
                    backgroundColor: "white",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={username}
                    onChangeText={username => this.setState({ username })}
                  />
                </Item>
                <Body>
                  <Label style={{ color: "white" }}>Password</Label>
                </Body>
                <Item
                  rounded
                  style={{ backgroundColor: "white", marginTop: 10 }}
                >
                  <Input
                    autoCorrect={false}
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={password => this.setState({ password })}
                  />
                </Item>
              </Form>
            </Body>
          </ListItem>
          <Button full success onPress={() => this.handleLogin()}>
            <Text>Login</Text>
          </Button>
          <Button full warning onPress={() => this.handleRegister()}>
            <Text>Register</Text>
          </Button>
        </List>
        <Body>
          <Label style={{ color: "red", opacity: 0.6 }} />
        </Body>
      </Content>
    );
  }
}

export default Login;
