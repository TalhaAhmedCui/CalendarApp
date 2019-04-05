import React, { Component } from "react";
import { styles } from "./styles";
import { Text, View, Button } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent
} from "react-native-popup-dialog";

class Item extends Component {
  state = { visible: false };

  async deleteMe() {
    const { email, token, id } = this.props;

    const resp = await axios.delete(
      `https://www.googleapis.com/calendar/v3/calendars/${email}/events/${id}?access_token=${token}`
    );

    this.setState({ visible: false });

    this.props.loadData(token, email);
  }

  render() {
    const { id, summary, startDate, endDate } = this.props;
    return (
      <View>
        <Card>
          <Text style={styles.header}>{summary}</Text>
          <Text>Start: {startDate}</Text>
          <Text>End: {endDate}</Text>
          <Button
            title="Delete"
            onPress={() => this.setState({ visible: true })}
          />
          <Dialog
            visible={this.state.visible}
            width={400}
            footer={
              <DialogFooter>
                <DialogButton
                  text="CANCEL"
                  onPress={() => {
                    this.setState({ visible: false });
                  }}
                />
                <DialogButton text="OK" onPress={() => this.deleteMe()} />
              </DialogFooter>
            }
          >
            <DialogContent>
              <Text>Are you sure?</Text>
            </DialogContent>
          </Dialog>
        </Card>
      </View>
    );
  }
}

export default Item;
