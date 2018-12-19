import React, { Component } from "react";
import { observer } from "mobx-react";

// NativeBase Components
import { Text, List, Button } from "native-base";
// Component
import CartItem from "./CartItem";
//Store
import CartStore from "../../store/CartStore";

class CoffeeCart extends Component {
  render() {
    const items = CartStore.items;
    let content;
    if (items) {
      content = items.map(item => <CartItem item={item} key={item.id} />);
    }

    return (
      <List>
        {content}
        <Button full danger onPress={() => CartStore.checkoutCart()}>
          <Text>Checkout</Text>
        </Button>
      </List>
    );
  }
}

export default observer(CoffeeCart);
