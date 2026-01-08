import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DemoScreen } from './src/screens/demo-screen';
import HomeScreen from './src/screens/home-screen';
import ProfileScreen from './src/screens/profile-screen';
import { SignInScreen } from './src/screens/signin-screen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'SignIn Screen' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile Screen' }}
        />
        <Stack.Screen
          name="Demo"
          component={DemoScreen}
          options={{ title: 'Demo Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
