import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assurez-vous d'avoir installé react-native-vector-icons

// Importez vos hooks de contextes si nécessaire
import { postRequest } from '../../Context/Services'; 
import { useNotification } from '../../Context/NotificationContext'; 
import { useSpinner } from '../../Context/SpinnerContext'; 

const ResetPasswordForm = () => {
  const { showNotification } = useNotification();
  const { setLoading } = useSpinner();

  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

    
  const handleSendCode = async () => {
    /* afficher spinner */
    setLoading(true);
    
    try {
      await sendCodeVerification(email);
    } catch (err) {
       showNotification(err.message, "error", "", 0); // Utilisez votre méthode de notification
      /* cacher spinner */
      setLoading(false);
    }
  };

  async function sendCodeVerification(email) {
    let isComplete = true;
    let message_erreur = "Erreur: \n";

    if (!email) {
        message_erreur += "- Email est requis. \n";
        isComplete = false;
    }

    if (isComplete === false) {
        /* cacher spinner */
        setLoading(false);
        showNotification(message_erreur, "error", "", 0);
        return;
    }  
   
    try {
        email = email.trim();
        const data = await postRequest("api.php", {
            email,
            action: "send_code_reset_password",
        });
        if (data.success) {
            setLoading(false);
            showNotification(data.message, "success", "", 0);
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
    
  }



  const handleResetPassword = async () => {
    /* afficher spinner */
    setLoading(true);
   
    try {
      await sendNewPassword(email, resetCode, newPassword);
    } catch (err) {
       showNotification(err.message, "error", "", 0); // Utilisez votre méthode de notification
      /* cacher spinner */
      setLoading(false);
    }
  };


/**
 * Fonction pour réinitialiser le mot de passe de l'utilisateur
 * @param {string} email - L'adresse email de l'utilisateur
 * @param {string} reset_code - Le code de réinitialisation envoyé par mail
 * @param {string} new_password - Le nouveau mot de passe de l'utilisateur
 * @returns {Promise<void>} Une promesse qui résout lorsque le mot de passe est réinitialisé avec succès, ou qui rejette avec une erreur si une erreur se produit
 */
  async function sendNewPassword(email, reset_code, new_password) {
    
    let isComplete = true;
    let message_erreur = "Erreur: \n";

    if (!email) {
        message_erreur += "- Email est requis. \n";
        isComplete = false;
    }

    if (!reset_code) {
        message_erreur += "- Code est requis. \n";
        isComplete = false;
    }

    if (!new_password) {
        message_erreur += "- Nouveau mot de passe est requis. \n";
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
        reset_code = reset_code.trim();
        new_password = new_password.trim();


        const data = await postRequest("api.php", {
            email,
            reset_code,
            new_password,
            action: "reset_password",
        });
        if (data.success) {
            setLoading(false);
            showNotification(data.message, "success", "Home", 3);
        } else {    
            setLoading(false);
            showNotification(data.message, "error", "", 0);
        } 
    // Code pour envoyer le code de réinitialisation par mail
    }
    catch (err) {
        setLoading(false);
        showNotification(err.message, "error", "", 0);
    }
    finally {
        /* cacher spinner */
        setLoading(false);
    }
  }


  return (
    <View style={styles.centeredContent}>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <Icon name="envelope" color="#ffffff" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
          <Text style={styles.buttonText}>Envoyer le code</Text>
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Code de Réinitialisation</Text>
          <Icon name="code" color="#ffffff" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Code de réinitialisation"
            value={resetCode}
            onChangeText={setResetCode}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <Icon name="lock" color="#ffffff" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
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
  formContainer: {
    width: '80%',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#c7c7c7', // Texte gris clair
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333', // Bordure grise foncée
    padding: 10,
    borderRadius: 5,
    color: '#ffffff', // Texte blanc
    backgroundColor: '#1e1e1e', // Fond d'entrée sombre
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#4b8eda', // Bleu pour les boutons
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff', // Texte blanc
    fontSize: 16,
  },
  // ... Autres styles si nécessaire ...
});

export default ResetPasswordForm;
