import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Login from "./Login";

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Home: { screen: Home }
});

const App = createAppContainer(MainNavigator);

export default App;
