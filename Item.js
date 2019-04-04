import React, { Component } from "react";
import { styles } from "./styles";
import { Text, View, Button } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

class Item extends Component {
  deleteMe = () => {
    //axios.delete("");
  };

  render() {
    const { id, summary, startDate, endDate } = this.props;
    return (
      <View>
        <Card>
          <Text style={styles.header}>{summary}</Text>
          <Text>Start: {startDate}</Text>
          <Text>End: {endDate}</Text>
          <Button title="Delete" onPress={() => this.deleteMe(id)} />
        </Card>
      </View>
    );
  }
}

export default Item;
