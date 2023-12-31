import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, Button, Linking  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationProvider } from './Context/NotificationContext';
import ModalNotification from './Components/ui/Utils/ModalNotification';
import { SpinnerProvider } from './Context/SpinnerContext';
import LoginForm from './Components/ui/LoginForm';
import RegisterForm from './Components/ui/RegisterForm';
import ResetPasswordForm from './Components/ui/ResetPasswordForm';
import HomeComponent from './Components/ui/HomeComponent';
import EncodageCrypto from './Components/ui/Utils/CryptoEncodage';
import DetailsCrypto from './Components/ui/Utils/DetailsCrypto';
import { AuthProvider } from './Context/AuthContext';
import { StatusBar } from 'react-native';
import AuthChecker from './Context/AuthChecker';
import { DataProvider } from './Context/DataContext';


const Stack = createNativeStackNavigator();





function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthChecker" component={AuthChecker} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeComponent} options={{ headerShown: false }} />
      <Stack.Screen name="EncodageCrypto" component={EncodageCrypto} options={{ headerShown: false }} />
      <Stack.Screen name="DetailsCrypto" component={DetailsCrypto} options={{ headerShown: false }} />
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
            <DataProvider>
              <ModalNotification />
              <AppRoutes />
            </DataProvider>
          </SpinnerProvider>
        </NotificationProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

