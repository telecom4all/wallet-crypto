import React, { createContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from '../Context/Services';
import { useNotification } from '../Context/NotificationContext';
import { useSpinner } from '../Context/SpinnerContext';

// Création du contexte
export const DataContext = createContext();

// Utilitaire pour nettoyer les données récupérées d'AsyncStorage
const cleanStorageData = (data) => {
	return data.replace(/"/g, "");
};

export const DataProvider = ({ children }) => {
  const [loggedInValue, setLoggedInValue] = useState(null);
  const [emailValue, setEmailValue] = useState(null);
  const [freeValue, setFreeValue] = useState(null);
  const [maticWalletValue, setMaticWalletValue] = useState(null);
  const [listCryptos, setListCryptos] = useState([]);
  const [listTransactions, setListTransactions] = useState([]);

  const { showNotification } = useNotification();
  const { setLoading } = useSpinner();

  // Définir la fonction fetchData ici
  const fetchData = useCallback(async () => {
    try {
        setLoading(true);

        // Chargez les données d'AsyncStorage.
        const storedLoggedIn = await AsyncStorage.getItem("loggedIn");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedFree = await AsyncStorage.getItem("free");
        const storedMaticWallet = await AsyncStorage.getItem("matic_wallet");

        // Nettoyez les données et mettez à jour l'état.
        const loggedIn = storedLoggedIn
            ? cleanStorageData(storedLoggedIn)
            : null;
        setLoggedInValue(loggedIn);
        setEmailValue(storedEmail ? cleanStorageData(storedEmail) : null);
        setFreeValue(storedFree ? cleanStorageData(storedFree) : null);
        setMaticWalletValue(
            storedMaticWallet ? cleanStorageData(storedMaticWallet) : null
        );

        // Si 'loggedIn' est défini, lancez les requêtes pour charger les données supplémentaires.
        if (loggedIn) {
            const cryptoResponse = await postRequest("api.php", {
                uuid: loggedIn,
                action: "load_cryptos",
            });
            if (cryptoResponse.success === true) {
                setListCryptos(cryptoResponse.message);
            } else {
                showNotification(
                    cryptoResponse.message ||
                        "Erreur de réception de la liste des cryptos",
                    "error"
                );
            }

            const transactionResponse = await postRequest("api.php", {
                uuid: loggedIn,
                action: "load_transaction",
            });
            if (transactionResponse.success === true) {
                setListTransactions(transactionResponse.message);
            } else {
                showNotification(
                    transactionResponse.message ||
                        "Erreur de réception de la liste des transactions",
                    "error"
                );
            }
        }
    } catch (error) {
        showNotification(
            error.message || "Erreur lors du chargement des données",
            "error"
        );
    } finally {
        setLoading(false);
    }
  }, []);

  // Passer les variables d'état et les fonctions via la valeur du contexte
  return (
    <DataContext.Provider
        value={{
            loggedInValue,
            setLoggedInValue,
            emailValue,
            setEmailValue,
            freeValue,
            setFreeValue,
            maticWalletValue,
            setMaticWalletValue,
            listCryptos,
            setListCryptos,
            listTransactions,
            setListTransactions,
            fetchData,
        }}
        >
        {children}
    </DataContext.Provider>

  );
};
