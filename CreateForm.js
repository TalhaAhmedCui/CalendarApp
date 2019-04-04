import React, { Component } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { styles } from "./styles";
import axios from "axios";
const moment = require("moment");

class CreateForm extends Component {
  state = { text: "Enter title" };

  async create() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");

    const resp = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${email}/events?access_token=${token}`,
      {
        start: {
          dateTime: "2019-04-04T09:30:00.0z"
        },
        end: {
          dateTime: "2019-04-04T10:30:00.0z"
        },
        summary: this.state.text
      }
    );

    console.log(resp.data);
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
