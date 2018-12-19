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
      shop: this.props.coffeeshop
    });
  }

  render() {
    const { coffeeshop } = this.props;
    return (
      <ImageBackground
        source={{ uri: coffeeshop.background }}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <ListItem
          button
          onPress={() => this.handlePress(coffeeshop)}
          style={styles.listitem}
        >
          <Card style={styles.transparent}>
            <CardItem style={styles.transparent}>
              <Left>
                <Thumbnail
                  bordered
                  source={{ uri: coffeeshop.img }}
                  style={styles.thumbnail}
                />
                <Text style={styles.text}>{coffeeshop.name}</Text>
                <Text note style={styles.text}>
                  {coffeeshop.distance}
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
