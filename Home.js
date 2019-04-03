import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, photoUrl } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome {name}</Text>
        <Image style={styles.image} source={{ uri: photoUrl }} />
      </View>
    );
  }
}

export default Home;
