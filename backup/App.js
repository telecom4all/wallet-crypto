import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationProvider } from './Context/NotificationContext';
import ModalNotification from './Components/ui/Utils/ModalNotification';
import { SpinnerProvider } from './Context/SpinnerContext';
import LoginForm from './Components/ui/LoginForm';
import RegisterForm from './Components/ui/RegisterForm';
import ResetPasswordForm from './Components/ui/ResetPasswordForm';
import HomeComponent from './Components/ui/HomeComponent'; // Assurez-vous que c'est le bon chemin
import { AuthProvider, useAuth } from './Context/AuthContext';
import { StatusBar } from 'react-native'; // Ajoutez cette ligne
import AuthChecker from './Context/AuthChecker'; // Assurez-vous que le chemin d'accès est correct.
const Stack = createNativeStackNavigator();

/*function AuthChecker({ navigation }) {
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      navigation.navigate(isAuthenticated ? 'Home' : 'Login');
    }
  }, [isAuthenticated, isLoading, navigation]);

  return null;
}
*/
function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthChecker" component={AuthChecker} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeComponent} options={{ headerShown: false }} />
      
      <Stack.Screen name="Register" component={RegisterForm} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordForm} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function AppWrapper() {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
     
      <AuthProvider>
        <NotificationProvider>
          <SpinnerProvider>
            <ModalNotification />
            <AppRoutes />
          </SpinnerProvider>
        </NotificationProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
