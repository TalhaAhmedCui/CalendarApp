import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { styles } from "./styles";
import axios from "axios";
import DatePicker from "react-native-datepicker";

const moment = require("moment");

class CreateForm extends Component {
  static navigationOptions = {
    title: "Create event"
  };

  state = {
    text: "Enter title",
    start: moment().format("YYYY-MM-DD hh:mm"),
    end: moment().format("YYYY-MM-DD hh:mm")
  };

  async create() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");

    const { text, start, end } = this.state;

    const startSplitted = start.toString().split(" ");
    const endSplitted = end.toString().split(" ");

    const resp = await axios.post(
      `https://www.googleapis.com/calendar/v3/calendars/${email}/events?access_token=${token}`,
      {
        start: {
          dateTime: `${startSplitted[0]}T${startSplitted[1]}:00.0Z` //`2019-04-04T09:30:00.0z`
        },
        end: {
          dateTime: `${endSplitted[0]}T${endSplitted[1]}:00.0Z` //"2019-04-04T10:30:00.0z"
        },
        summary: text
      }
    );

    //console.log(resp.data);

    if (resp.status === 200) {
      navigation.goBack();
    } else {
      Alert.alert("Error, please try again");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create new event:</Text>
        <Text>Enter summary</Text>
        <TextInput
          style={{
            height: 40,
            width: 400,
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Text>Enter start date</Text>
        <DatePicker
          style={{ width: 400 }}
          date={this.state.start}
          mode="datetime"
          placeholder="select date"
          format="YYYY-MM-DD hh:mm"
          is24Hour={true}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={start => {
            this.setState({ start });
          }}
        />

        <Text>Enter end date</Text>
        <DatePicker
          style={{ width: 400 }}
          date={this.state.end}
          mode="datetime"
          placeholder="select date"
          format="YYYY-MM-DD hh:mm"
          is24Hour={true}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={end => {
            this.setState({ end });
          }}
        />

        <Button title="Submit" onPress={() => this.create()} />
      </View>
    );
  }
}

export default CreateForm;
