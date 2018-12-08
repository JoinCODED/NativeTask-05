import React, { Component } from "react";
import { ImageBackground, View } from "react-native";

// NativeBase Components
import { ListItem, Card, CardItem, Thumbnail, Text, Left } from "native-base";

// Style
import styles from "./styles";

// Navigation
import { withNavigation } from "react-navigation";

class CoffeeItem extends Component {
  handlePress() {
    this.props.navigation.navigate("CoffeeDetail", {
      shop: this.props.coffeeShop
    });
  }

  render() {
    return (
      <ImageBackground
        source={{ uri: this.props.coffeeShop.background }}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <ListItem
          button
          onPress={() => this.handlePress(this.props.coffeeShop)}
          style={styles.listitem}
        >
          <Card style={styles.transparent}>
            <CardItem style={styles.transparent}>
              <Left>
                <Thumbnail
                  bordered
                  source={{ uri: this.props.coffeeShop.img }}
                  style={styles.thumbnail}
                />
                <Text style={styles.text}>{this.props.coffeeShop.name}</Text>
                <Text note style={styles.text}>
                  {this.props.coffeeShop.distance}
                </Text>
              </Left>
            </CardItem>
          </Card>
        </ListItem>
      </ImageBackground>
    );
  }
}

export default withNavigation(CoffeeItem);