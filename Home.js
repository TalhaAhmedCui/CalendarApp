import React, { Component } from "react";
import { ScrollView } from "react-native";
import { styles } from "./styles";
import Axios from "axios";
import Item from "./Item";
const moment = require("moment");

class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = { items: [] };

  async componentDidMount() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");
    const email = navigation.getParam("email");

    const resp = await Axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${email}/events?access_token=${token}`
    );

    this.setState({
      items: resp.data.items
    });
  }

  render() {
    const { navigation } = this.props;
    const token = navigation.getParam("accessToken");

    return (
      <ScrollView>
        {this.state.items.map(item => (
          <Item
            summary={item.summary}
            startDate={moment(item.start.dateTime).format("DD.MM.YYYY h:mm")}
            endDate={moment(item.end.dateTime).format("DD.MM.YYYY h:mm")}
            id={item.id}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Home;
