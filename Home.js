import React, { Component } from "react";
import { ScrollView, View, Text, Button } from "react-native";
import { styles } from "./styles";
import axios from "axios";
import Item from "./Item";
import Spinner from "react-native-loading-spinner-overlay";

const moment = require("moment");

class Home extends Component {
  static navigationOptions = {
    title: "Calendar"
  };

  state = { items: [] };

  async componentDidMount() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");

    const resp = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${email}/events?access_token=${token}`
    );

    this.setState({
      items: resp.data.items
    });
  }

  create() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");
    navigation.navigate("CreateNew", {
      accessToken: token,
      email
    });
  }

  render() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");

    return (
      <ScrollView>
        <Button title="Create" onPress={() => this.create()} />

        <Spinner
          visible={this.state.items.length === 0}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {this.state.items.map(item => (
          <Item
            key={item.id}
            summary={item.summary}
            startDate={moment(item.start.dateTime).format("DD.MM.YYYY h:mm")}
            endDate={moment(item.end.dateTime).format("DD.MM.YYYY h:mm")}
            id={item.id}
            email={email}
            accessToken={token}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Home;
