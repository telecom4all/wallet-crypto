import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { postRequest } from '../../Context/Services'; 

// Importez vos hooks de contextes si nécessaire
import { useNotification } from '../../Context/NotificationContext'; 
import { useSpinner } from '../../Context/SpinnerContext'; 

import { sharedStyles } from './Utils/Elements/styles/SharedStyles'; 
import { loginStyles } from './Utils/Elements/styles/AuthStyles';
import Input from './Utils/Elements/Input';
import Button from './Utils/Elements/Button';

const LoginForm = () => {
  //const { login } = useAuth();
  const navigation = useNavigation();
  // Utilisez vos hooks de contextes ici
  const { showNotification } = useNotification();
  const { setLoading } = useSpinner();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    /* afficher spinner */
    setLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
       showNotification(err.message, "error", "", 0); // Utilisez votre méthode de notification
      /* cacher spinner */
      setLoading(false);
    }
  };

  async function login(email, password) {
    let isComplete = true;
    let message_erreur = "Erreur: \n";

    if (!email) {
      message_erreur += "- Email est requis. \n";
      isComplete = false;
    }

    if (!password) {
      message_erreur += "- Mot de passe est requis. \n";
      isComplete = false;
    }

    if (isComplete === false) {
      showNotification(message_erreur, "error", "", 0);
      /* cacher spinner */
      setLoading(false);
      return;
    }
    
    try {

      email = email.trim();
      password = password.trim();
      
      const data = await postRequest("api.php", {
        email,
        password,
        action: "connect",
      });
      
      if (data.success) {
       
        await AsyncStorage.setItem("free", JSON.stringify(data.message.free));
        await AsyncStorage.setItem("loggedIn", JSON.stringify(data.message.uuid));
        await AsyncStorage.setItem("email", JSON.stringify(data.message.email));
        
        if(data.message.matic_wallet){
          if(data.message.matic_wallet == '' || data.message.matic_wallet == null || data.message.matic_wallet == 'null' || data.message.matic_wallet == 'undefined' || data.message.matic_wallet == undefined){
            await AsyncStorage.setItem("matic_wallet", JSON.stringify(""));
          }else{
            await AsyncStorage.setItem("matic_wallet", JSON.stringify(data.message.matic_wallet));
          }
        
        }
        else{
          await AsyncStorage.setItem("matic_wallet", JSON.stringify(""));
        }
        

       
        setTimeout(() => {
          
          
          showNotification("Vous êtes connecté", "success", "Home", 3);
          setLoading(false);
        }, 4000);
        
      } else {
        setLoading(false);
        showNotification(data.message, "error", "", 0);
        
      }
    } catch (err) {
      setLoading(false);
      showNotification(err.message, "error", "", 0);
      
    } finally {
      /* cacher spinner */
      //setLoading(false);
    }
  }

  return (
    <View style={sharedStyles.container}>
      <View style={loginStyles.loginForm}>
        <Text style={sharedStyles.heading}>Connexion</Text>
        <View style={loginStyles.formGroup}>
          <Text style={loginStyles.label}>Email</Text>
          <Input
            style={loginStyles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
           />
        </View>
        <View style={loginStyles.formGroup}>
          <Text style={loginStyles.label}>Mot de passe</Text>
          <Input
            style={loginStyles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
           />
        </View>
       

        <Button
          title="Se connecter"
          onPress={handleSubmit}
          style={loginStyles.bpBlue}
          textStyle={loginStyles.textBPBlue}
        />


        <Button
          title="Mot de passe oublié?"
          onPress={() => navigation.navigate('ResetPassword')}
          style={loginStyles.bpOrange}
          textStyle={loginStyles.textBPOrange}
        />

        
        <Button
          title="Inscription"
          onPress={() => navigation.navigate('Register')}
          style={loginStyles.bpGreen}
          textStyle={loginStyles.textBPGreen}
        />
      
      </View>
    </View>
  );
};



export default LoginForm;
