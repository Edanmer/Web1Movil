import { createStackNavigator } from 'react-navigation';
import LoginScreen from './app/screens/LoginScreen';
import MapScreen from './app/screens/MapScreen';
import ClientScreen from './app/screens/ClientScreen';
import RutasScreen from './app/screens/RutasScreen';

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Map: { screen: MapScreen },
  Client: { screen: ClientScreen },
  Ruta: { screen: RutasScreen }
});

export default App;
