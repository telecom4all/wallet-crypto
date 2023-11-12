// Sidebar.js
import React, { useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useNotification } from '../../../Context/NotificationContext'; 
import { useSpinner } from "../../../Context/SpinnerContext";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRedo, faKey, faSave, faUpload, faTrashAlt, faBook, faEnvelope  } from '@fortawesome/free-solid-svg-icons';
//import RNFS from 'react-native-fs';
//import Share from 'react-native-share';

import { DataContext } from '../../../Context/DataContext'; 
import { postRequest, postRequestFile } from '../../../Context/Services';



import * as DocumentPicker from 'expo-document-picker';

const SidebarContent = () => {
    const { showNotification } = useNotification();
    const navigation = useNavigation();
    const { loggedInValue, emailValue, freeValue, maticWalletValue, fetchData } = useContext(DataContext);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const { setLoading } = useSpinner();

    // Ajoutez vos fonctions et logiques ici
    const logout = async () => {
        await AsyncStorage.setItem("free", JSON.stringify(""));
        await AsyncStorage.setItem("loggedIn", JSON.stringify(""));
        await AsyncStorage.setItem("email", JSON.stringify(""));
        await AsyncStorage.setItem("matic_wallet", JSON.stringify(""));
        
        showNotification("Déconnection éffectuée", "warning", "Login", 3);
        // Logique de déconnexion
    };

    const sendSupportEmail = () => {
      const email = "infos@telecom4all.be"; // Remplacez par votre email de support
      const subject = encodeURIComponent("Demande de support");
      const body = encodeURIComponent("Décrivez ici votre problème ou votre question.");
  
      Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

    // Ajoutez vos fonctions ici
    const refreshData = async () => {
      await fetchData();
        // Logique pour rafraîchir les données
    };

    const changePassword = () => {
      if (!loggedInValue) {
        showNotification("'Erreur: UUID non trouvé.", "error", "", 0); 
        return;
      }
      setIsModalVisible(true);
    };

    const handlePasswordChange = async () => {
      setIsModalVisible(false);
      if (newPassword.trim() !== '') {
        try {
          setLoading(true);
          const response = await postRequest("api.php", {
            uuid: loggedInValue, 
            action: "change_password",
            newPassword: newPassword.trim()
          });

          if (response.success && response.message.length > 0) {
            
            showNotification(response.message, "success", "Login", 3);
          } else {
            
            showNotification(response.message, "error", "", 0);
          }
          setLoading(false); // Arrêtez le chargemen
        } catch (error) {
          setLoading(false); // Arrêtez le chargemen
          showNotification(
            error || "Une erreur est survenue lors de la recherche des tokens.",
            "error",
            "",
            0
          );
        } finally {
          setLoading(false); // Arrêtez le chargemen
        }
      }
    };


    const backupData = async () => {
      

      if (!loggedInValue) {
          showNotification("'Erreur: UUID non trouvé.", "error", "", 0); 
          return;
      }
  
      setLoading(true); // Utilisez votre logique de spinner ici
      try {
          const response = await postRequest('api.php', { 
              uuid: loggedInValue,
              action: 'backup_data'
          });
  
          if (response.success) {
            const uri = response.message;
            setLoading(false);
            Linking.openURL(uri); // Ouvre l'URL dans le navigateur par défaut
            showNotification("Le fichier est prêt à être téléchargé.", "success", "", 0);
          } else {
            setLoading(false);
              showNotification(response.message , "error", "", 0); 
          }
      } catch (error) {
        setLoading(false);
        console.log(error)
          showNotification(error.message || "Erreur lors du backup.", "error", "", 0); 
      } finally {
          setLoading(false); // Arrêtez le chargement
      }
  }

  const restoreData = async () => {
      try {
        const res = await DocumentPicker.getDocumentAsync({});

       
        // Accédez au premier élément du tableau 'assets'
        const file = res.assets[0];
       
        if (!file) return;

          
          if (!loggedInValue) {
              showNotification("'Erreur: UUID non trouvé.", "error", "", 0); 
              return;
          }

          

          setLoading(true); // Afficher le spinner

          
          const response = await postRequestFile('api.php', { 
            uuid: loggedInValue,
            action: 'restore_data',
            importFile : file
        });


        if (response.success) {
         
          setLoading(false);
          await fetchData();
          showNotification(response.message || "La restauration a été réalisé.", "success", "", 0);
        } else {
          setLoading(false);
            showNotification(response.message , "error", "", 0); 
        }
      } catch (err) {
        setLoading(false);
        if (err.code === 'E_DOCUMENT_PICKER_CANCELED' || err.message === 'User canceled document picker') {
          // L'utilisateur a annulé la sélection de fichier
        } else {
            // Gérer les autres types d'erreurs
            showNotification("Une erreur est survenue", "error", "", 0);
        }
      } finally {
          setLoading(false); // Cacher le spinner
      }
  };

    const deleteWallet = async () => {
      if (!loggedInValue) {
        showNotification("'Erreur: UUID non trouvé.", "error", "", 0); 
        return;
      }
    
      Alert.alert(
        "Confirmer la suppression",
        "Êtes-vous sûr de vouloir supprimer votre portefeuille? Cette action est irréversible.",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Suppression annulée"),
            style: "cancel"
          },
          { 
            text: "OK", 
            onPress: async () => {
              setLoading(true); // Utilisez votre logique de spinner ici
              
              try {
                  const response = await postRequest('api.php', { 
                      uuid: loggedInValue,
                      action: 'delete_wallet'
                  });
          
                  if (response.success) {
                    
                    setLoading(false);
                    await AsyncStorage.setItem("free", JSON.stringify(""));
                    await AsyncStorage.setItem("loggedIn", JSON.stringify(""));
                    await AsyncStorage.setItem("email", JSON.stringify(""));
                    await AsyncStorage.setItem("matic_wallet", JSON.stringify(""));  
                    showNotification(response.message, "success", "Login", 3);
                  } else {
                    setLoading(false);
                      showNotification(response.message , "error", "", 0); 
                  }
              } catch (error) {
                setLoading(false);
                console.log(error)
                  showNotification(error.message || "Erreur lors du backup.", "error", "", 0); 
              } finally {
                  setLoading(false); // Arrêtez le chargement
              }
            }
          }
        ]
      );
    };

    const navigateToUpgradeAbo = () => {
        navigation.navigate('UpgradeAboScreen'); // Assurez-vous que 'UpgradeAboScreen' est le nom correct de votre écran
      };

    return (
    <View style={styles.sidebarContainer}>
        <View style={[styles.centeredText]}>
            <Text style={[styles.blanc]}>Email: {emailValue}</Text>
        </View>

        <View style={[styles.centeredText]}>
            <Text style={[styles.blanc]}>UUID: {loggedInValue}</Text>
        </View>

        {freeValue == "false" && (
        <View style={[styles.centeredText]}>
            <Text style={styles.linkText}>Version complète</Text>
        </View>
        )}

        {freeValue == "true" && (
        <View style={[styles.centeredText]}>
            <Text style={[styles.blanc]}>Version Gratuite 5 Cryptos Max</Text>
            <TouchableOpacity onPress={navigateToUpgradeAbo}>
            <Text  style={styles.linkText}>Passez à la version Complete</Text>
            </TouchableOpacity>
        </View>
        )}

        {maticWalletValue != "" && (
        <View style={[styles.centeredText]}>
            <Text style={[styles.blanc]}>Matic: {maticWalletValue}</Text>
        </View>
        )}
        
        {/* Ajoutez d'autres informations et boutons ici */}
       
        <TouchableOpacity style={[styles.button, styles.buttonDisconect]} onPress={logout}>
            <FontAwesomeIcon icon={faRedo} size={20} />
            <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>

        {/* Ajoutez d'autres boutons ici */}
        <TouchableOpacity style={[styles.button, styles.buttonRefresh]} onPress={refreshData}>
            <FontAwesomeIcon icon={faRedo} size={20} />
            <Text style={styles.buttonText}>Rafraîchir les Datas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonChangePassword]} onPress={changePassword}>
            <FontAwesomeIcon icon={faKey} size={20} />
            <Text style={styles.buttonText}>Changer mot de passe</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={[styles.button, styles.buttonBackup]} onPress={backupData}>
            <FontAwesomeIcon icon={faSave} size={20} />
            <Text style={styles.buttonText}>Sauvegarde</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonRestore]} onPress={restoreData}>
            <FontAwesomeIcon icon={faUpload} size={20} />
            <Text style={styles.buttonText}>Restauration</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={deleteWallet}>
            <FontAwesomeIcon icon={faTrashAlt} size={20} />
            <Text style={styles.buttonText}>Supprimer Portefeuille</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonDocumentation]} onPress={() => {/* Votre logique de navigation */}}>
            <FontAwesomeIcon icon={faBook} size={20} />
            <Text style={styles.buttonText}>Documentation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSupport]} onPress={sendSupportEmail}>
            <FontAwesomeIcon icon={faEnvelope } size={20} />
            <Text style={styles.buttonText}>Contacter le Support</Text>
        </TouchableOpacity>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Nouveau mot de passe:</Text>
              <TextInput 
                style={styles.modalInput}
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry
              />
              <Button
                title="Changer"
                onPress={handlePasswordChange}
              />
            </View>
          </View>
        </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#333333', // Fond sombre
    color: '#fff',
    
    // Ajoutez vos styles pour la barre latérale ici
  },
  centeredText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  linkText: {
    color: 'green', // Ou toute autre couleur pour le lien
    borderColor: 'blue', // Couleur de la bordure
    borderWidth: 1, // Épaisseur de la bordure
    borderRadius: 5, // Rayon de bordure pour les coins arrondis (optionnel)
    padding: 5, // Espace entre le texte et la bordure (optionnel)
    marginVertical: 5, // Espace entre les éléments (optionnel)
    marginHorizontal: 10, // Espace entre les éléments (optionnel)
  },
  blanc: {

    color: 'white', // Ou toute autre couleur pour le lien
    
    padding: 5, // Espace entre le texte et la bordure (optionnel)
    marginVertical: 5, // Espace entre les éléments (optionnel)
    marginHorizontal: 10, // Espace entre les éléments (optionnel)
    },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10, // Espace entre les éléments (optionnel)
    marginHorizontal: 10, // Espace entre les éléments (optionnel)
  },
  buttonRefresh: {
    backgroundColor: '#4CAF50', // Vert
  },
  buttonChangePassword: {
    backgroundColor: '#2196F3', // Bleu
  },
  buttonBackup: {
    backgroundColor: '#FFC107', // Jaune
  },
  buttonRestore: {
    backgroundColor: '#FF9800', // Orange
  },
  buttonDelete: {
    backgroundColor: '#F44336', // Rouge
  },
  buttonDocumentation: {
    backgroundColor: '#9C27B0', // Violet
  },
  buttonDisconect: {
    backgroundColor: '#607D8B', // Gris
  },
  buttonSupport: {  
    backgroundColor: 'green', // Gris
  },
  buttonText: {
    marginLeft: 10,
    color: '#2ff',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalInput: {
    width: 200,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10
  }
});

export default SidebarContent;
