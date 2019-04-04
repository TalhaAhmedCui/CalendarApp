import React, { Component } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { styles } from "./styles";
const moment = require("moment");

class CreateForm extends Component {
  state = { text: "Enter title" };

  create() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");

    axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${email}/events?accessToken=${token}`,
      {
        body: {
          start: {
            dateTime: moment()
          },
          end: {
            dateTime: moment()
          },
          summary: this.state.text
        }
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button title="Submit" onPress={() => this.create()} />
      </View>
    );
  }
}

export default CreateForm;
