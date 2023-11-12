import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useNavigation } from '@react-navigation/native';
import { postRequest } from '../../Context/Services'; 

// Importez vos hooks de contextes si nécessaire
import { useNotification } from '../../Context/NotificationContext'; 
import { useSpinner } from '../../Context/SpinnerContext'; 

import Icon from 'react-native-vector-icons/FontAwesome'; // Assurez-vous d'installer react-native-vector-icons

const RegisterForm = () => {
  //const { login } = useAuth();
  //const navigation = useNavigation();
  // Utilisez vos hooks de contextes ici
  const { showNotification } = useNotification();
  const { setLoading } = useSpinner();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async () => {
    /* afficher spinner */
    setLoading(true);
    
    try {
      await registerUser(email, password, confirmPassword);
    } catch (err) {
       showNotification(err.message, "error", "", 0); // Utilisez votre méthode de notification
      /* cacher spinner */
      setLoading(false);
    }
  };

  async function registerUser(email, password, confirmPassword) {
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

    if (!confirmPassword) {
        message_erreur += "- la confirmation du mot de passe est requis. \n";
        isComplete = false;
    }


    if (password.trim() !== confirmPassword.trim()) {
        message_erreur += "- Les mots de passe ne correspondent pas. \n";
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
            action: "register",
        });
    
        if (data.success) {
                     
            setLoading(false);
            showNotification("Inscription réussie. Vous pouvez maintenant vous connecter.", "success", "Home", 3);
        
          } else {  
            setLoading(false);  
            showNotification(data.message, "error", "", 0);
        }   
    }
    catch (err) {
        setLoading(false);
        showNotification(err.message, "error", "", 0);
    }
    finally {
        /* cacher spinner */
        setLoading(false);
    }

    // ... (conservez la logique de votre fonction login existante)

    // Remplacez les opérations localStorage par AsyncStorage pour React Native
    // Par exemple:
    // await AsyncStorage.setItem('loggedIn', data.message.uuid);

    // Utilisez la navigation de React Native pour rediriger l'utilisateur
    // Par exemple:
    // navigation.navigate('Home');

    //showSpinner(); // Affiche le spinner

    //setTimeout(hideSpinner, 10000); // Masque le spinner après 10 secondes
    // Activer le spinner
    

   
    
    
  }

  return (
    <View style={styles.centeredContent}>
      <View style={styles.loginForm}>
        <Text style={styles.heading}>Inscription</Text>
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
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmation du mot de passe</Text>
          <TextInput
            style={styles.inputLogin}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <Button title="S'inscrire" onPress={handleSubmit} />

        {/* Ajoutez tout autre lien ou bouton si nécessaire */}
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
  // ... Autres styles si nécessaire ...
});


export default RegisterForm;
