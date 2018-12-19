import React, { Component } from "react";
import { observer } from "mobx-react";

// NativeBase Components
import { List, Content, Container } from "native-base";

// Store
import CoffeeStore from "../../store/CoffeeStore";

// Component
import CoffeeItem from "./CoffeeItem";
import CoffeeFooter from "../CoffeeFooter";
import PrivateNavigation from "../PrivateNavigation";

//Style
import styles from "./styles";

class CoffeeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Coffee List",
    headerLeft: null,
    headerRight: <PrivateNavigation route="CoffeeCart" />
  });

  render() {
    const coffeeshops = CoffeeStore.coffeeshops;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(coffeeshop => (
        <CoffeeItem coffeeshop={coffeeshop} key={coffeeshop.id} />
      ));
    }
    return (
      <Container style={styles.container}>
        <Content>
          <List>{ListItems}</List>
        </Content>
        <CoffeeFooter />
      </Container>
    );
  }
}

export default observer(CoffeeList);
