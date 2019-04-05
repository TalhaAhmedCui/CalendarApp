import React from "react";
import { Text, View, Button } from "react-native";
import { Google } from "expo";
import { styles } from "./styles";
import { CLIENT_ID } from "./config";

class Login extends React.Component {
  static navigationOptions = {
    title: "Login",
    headerLeft: null
  };

  state = {
    signedIn: false,
    name: "",
    photoUrl: "",
    email: "",
    accessToken: ""
  };

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: CLIENT_ID,
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: [
          "profile",
          "email",
          "https://www.googleapis.com/auth/calendar.events"
        ]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email,
          accessToken: result.accessToken
        });

        // console.log(result);
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          navigate("Home", {
            name: this.state.name,
            photoUrl: this.state.photoUrl,
            email: this.state.email,
            accessToken: this.state.accessToken
          })
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    );
  }
}
const LoginPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please sign in with your google account</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  );
};

export default Login;
