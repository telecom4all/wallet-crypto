import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { postRequest } from '../../Context/Services'; 

// Importez vos hooks de contextes si nécessaire
import { useNotification } from '../../Context/NotificationContext'; 
import { useSpinner } from '../../Context/SpinnerContext'; 

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
    // ... (conservez la logique de votre fonction login existante)

    // Remplacez les opérations localStorage par AsyncStorage pour React Native
    // Par exemple:
    // await AsyncStorage.setItem('loggedIn', data.message.uuid);

    // Utilisez la navigation de React Native pour rediriger l'utilisateur
    // Par exemple:
    // navigation.navigate('Home');

    //showSpinner(); // Affiche le spinner

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
      console.log(data);
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
    <View style={styles.centeredContent}>
      <View style={styles.loginForm}>
        <Text style={styles.heading}>Connexion</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputLogin}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.inputLogin}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Se connecter" onPress={handleSubmit} />

        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.authLink}>Mot de passe oublié?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.authLink}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fond sombre
  },
  loginForm: {
    width: '80%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Texte blanc
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#c7c7c7', // Texte gris clair
  },
  inputLogin: {
    borderWidth: 1,
    borderColor: '#333333', // Bordure grise foncée
    padding: 10,
    borderRadius: 5,
    color: '#ffffff', // Texte blanc
    backgroundColor: '#1e1e1e', // Fond d'entrée sombre
  },
  authLink: {
    color: '#4b8eda', // Bleu pour les liens
    marginTop: 10,
    textAlign: 'center',
  },
});


export default LoginForm;
