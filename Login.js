import React from "react";
import { Text, View, Image, Button } from "react-native";
import { Google } from "expo";
import { styles } from "./styles";
import Home from "./Home";

// const config = {
//   issuer: "https://accounts.google.com",
//   clientId: "SECRET",
//   redirectUrl: "REDIRECT_URL",
//   scopes: ["openid", "profile"]
// };

class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  state = { signedIn: false, name: "", photoUrl: "" };

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "128201743195-sgj0qjf1ofejmk02n39avukpb67gu2ja.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        });
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <Home name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    );
  }
}
const LoginPage = props => {
  return (
    <View>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  );
};

export default Login;
