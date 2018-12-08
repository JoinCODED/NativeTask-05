import React from "react";

// NativeBase Components
import { Text, Left, Body, Right, Button, ListItem, Icon } from "native-base";
import CartStore from "../../store/CartStore";

const CartItem = props => (
  <ListItem style={{ borderBottomWidth: 0 }}>
    <Left>
      <Text style={{ color: "white", marginLeft: 16 }}>
        {" "}
        {props.item.drink}{" "}
      </Text>
      <Text note style={{ marginLeft: 16 }}>
        {props.item.option}
      </Text>
    </Left>
    <Body>
      <Text style={{ color: "white" }}>{props.item.quantity}</Text>
    </Body>
    <Right>
      <Button
        transparent
        onPress={() => CartStore.removeItemFromCart(props.item)}
      >
        <Icon name="trash" style={{ color: "white", fontSize: 21 }} />
      </Button>
    </Right>
  </ListItem>
);

export default CartItem;
