import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Login from "./Login";
import CreateForm from "./CreateForm";

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  CreateNew: { screen: CreateForm }
});

const App = createAppContainer(MainNavigator);

export default App;
