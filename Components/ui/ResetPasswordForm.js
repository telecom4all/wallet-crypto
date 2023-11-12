import React, { useState } from 'react';
import { View, Text,  StyleSheet } from 'react-native';

// Importez vos hooks de contextes si nécessaire
import { postRequest } from '../../Context/Services'; 
import { useNotification } from '../../Context/NotificationContext'; 
import { useSpinner } from '../../Context/SpinnerContext'; 

import { sharedStyles } from './Utils/Elements/styles/SharedStyles'; 
import { resetPasswordStyles } from './Utils/Elements/styles/AuthStyles';
import Input from './Utils/Elements/Input';
import Button from './Utils/Elements/Button';

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
    <View style={sharedStyles.container}>
      <View style={resetPasswordStyles.resetPasswordForm}>
        <View style={resetPasswordStyles.formGroup}>
          <Text style={resetPasswordStyles.label}>Email</Text>
          
          <Input
            style={resetPasswordStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
           />
        </View>

        <Button
          title="Envoyer le code"
          onPress={handleSendCode}
          style={resetPasswordStyles.bpBlue}
          textStyle={resetPasswordStyles.textBPBlue}
        />

        <View style={resetPasswordStyles.formGroup}>
          <Text style={resetPasswordStyles.label}>Code de Réinitialisation</Text>
          
          <Input
            style={resetPasswordStyles.input}
            placeholder="Code de réinitialisation"
            value={resetCode}
            onChangeText={setResetCode}
           />
        </View>

        <View style={resetPasswordStyles.formGroup}>
          <Text style={resetPasswordStyles.label}>Nouveau mot de passe</Text>
          
          <Input
            style={resetPasswordStyles.input}
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
           />
        </View>

        <Button
          title="Réinitialiser le mot de passe"
          onPress={handleResetPassword}
          style={resetPasswordStyles.bpBlue}
          textStyle={resetPasswordStyles.textBPBlue}
        />
       
      </View>
    </View>
  );
};



export default ResetPasswordForm;
