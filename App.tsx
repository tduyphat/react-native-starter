import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from './src/screens/signin-screen';
import { AuthProvider, useAuth } from './src/contexts/auth-context';
import { Provider } from 'react-redux';
import store from './src/stores/store';
import MainNavigator from './src/screens/navigator/main-navigator';

const Stack = createNativeStackNavigator();

const App = () => {
   return (
    <AuthProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </AuthProvider>

  );
};

const AppContent: React.FC = () => {
   const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
