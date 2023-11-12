import React, { useState, useEffect, useCallback, memo, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Modal,
	FlatList,
	Image
	 
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"; // Assurez-vous d'installer cette dépendance
import { useNotification } from "../../../Context/NotificationContext";
import { postRequest } from "../../../Context/Services";
import { encodageStyles } from "./Elements/styles/EncodageStyle";

import { DataContext } from '../../../Context/DataContext'; // Assurez-vous que le chemin est correct
import { useSpinner } from "../../../Context/SpinnerContext";

import DateTimePicker from '@react-native-community/datetimepicker';



function CryptoEncodage({navigation }) {
	const { showNotification } = useNotification();
	const [selectedCrypto, setSelectedCrypto] = useState(null);
	const [transactionType, setTransactionType] = useState("achat");
	const [cryptoQuantity, setCryptoQuantity] = useState(""); // État pour la quantité de crypto
	const [usdValue, setUsdValue] = useState(""); // État pour la valeur en USD
	const [location, setLocation] = useState(""); // État pour le lieu
	const [transactionDate, setTransactionDate] = useState(getFormattedDate(new Date()));// État pour la date de transaction
	const [cryptoId, setCryptoId] = useState(""); // État pour l'ID de la crypto
	const [searchTerm, setSearchTerm] = useState("");
	
	const [foundTokens, setFoundTokens] = useState([]);
	const [selectedToken, setSelectedToken] = useState(null);

	const [isModalVisible, setModalVisible] = useState(false);
	const { setLoading } = useSpinner();

	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	function getFormattedDate(date) {
		let day = ('0' + date.getDate()).slice(-2); // Ajoute un zéro avant si nécessaire
		let month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro avant si nécessaire
		let year = date.getFullYear();
		return `${day}-${month}-${year}`;
	  }

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		// Formatez la date comme vous le souhaitez pour l'afficher ou la stocker
		let tempDate = new Date(currentDate);
		let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
		setTransactionDate(fDate); // Mise à jour de l'état avec la date formatée
	  };
	  

	const showDatepicker = () => {
	setShow(true);
	};

	const {
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
	  } = useContext(DataContext);

	const handleSelectToken = (token) => {
		setSearchTerm(token.data.name);
		setCryptoId(token.data.id);
		setModalVisible(false);
	};

	
	// Mettre à jour le searchTerm et le cryptoId lorsque selectedToken change
	useEffect(() => {
		if (selectedToken) {
			setSearchTerm(selectedToken.data.name);
			setCryptoId(selectedToken.crypto_id);
		}
	}, [selectedToken]);

    useEffect(() => {
		if (listCryptos && listCryptos.length > 0) {
		  // Définissez le crypto sélectionné sur le premier élément de la liste
		  setSelectedCrypto(listCryptos[0].crypto_id);
		}
	  }, [listCryptos]);

	const handleSearchClick = useCallback(async () => {
		setLoading(true);
		try {
			// Vérifiez si searchTerm est vide avant d'envoyer la requête
			if (!searchTerm.trim()) {
				showNotification(
					"Veuillez entrer un terme de recherche.",
					"error",
					"",
					0
				);
				return;
			}
			//setLoading(true);
			const response = await postRequest("api.php", {
				uuid: loggedInValue, // Utilisez AsyncStorage pour récupérer les valeurs stockées
				action: "find_crypto_by_name",
				searchTerm: searchTerm,
			});

			if (response.success && response.message.length > 0) {
				setFoundTokens(response.message);
				setModalVisible(true);
			} else {
				setFoundTokens([]);
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
		
	}, [searchTerm, showNotification, loggedInValue]);

	const handleAddCrypto = useCallback(async () => {
		 // Vérifiez si cryptoId et searchTerm ne sont pas vides
        if (!cryptoId.trim() || !searchTerm.trim()) {
        showNotification("L'ID et le nom de la crypto sont nécessaires.", "error");
        return;
        }
        try {
			setLoading(true);
            const response = await postRequest("api.php", {
                uuid: loggedInValue, // Utilisez AsyncStorage pour récupérer les valeurs stockées
                action: "add_crypto",
                cryptoId: cryptoId,
                cryptoName: searchTerm,
            });

            if (response.success) {
                await fetchData();
				//console.log(updatedCryptos); // Vous devrie
				//setListCryptos(updatedCryptos);
				showNotification(response.message, "success", "", 0);
                setCryptoId("");
                setSearchTerm("");

            } else {
                showNotification(response.message, "error", "", 0);
            }
			setLoading(false);
        }
        catch (error) {
			setLoading(false);
            showNotification(error || "Une erreur est survenue lors de l'ajout de la crypto.", "error", "", 0);
        }

    }, [cryptoId, searchTerm, showNotification, loggedInValue, setListCryptos]);

	/**
	 * Met en majuscule la première lettre d'une chaîne de caractères.
	 * @function capitalizeFirstLetter
	 * @param {string} string - La chaîne de caractères à modifier.
	 * @returns {string} La chaîne de caractères modifiée.
	 */
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	const handleAddTransaction = useCallback(async () => {
		let isComplete = true;
		let message_erreur = "Erreur: \n";

		if (isNaN(cryptoQuantity) || cryptoQuantity <= 0) {
			message_erreur += "- Quantité Crypto invalide. \n";
			isComplete = false;
		}
		if (isNaN(usdValue) || usdValue <= 0) {
			message_erreur += "- Montant USD invalide. \n";
			isComplete = false;
		}
		if (!location) {
			message_erreur += "- Veuillez entrer une location. \n";
			isComplete = false;
		}
		if (!transactionDate) {
			message_erreur += "- Veuillez sélectionner une date. \n";
			isComplete = false;
		}

		const selectedCryptoObject = listCryptos.find(crypto => crypto.crypto_id === selectedCrypto);

		if (!selectedCryptoObject) {
			message_erreur += "- Veuillez sélectionner une crypto. \n";
			isComplete = false;
		}


		if (!loggedInValue) {
			message_erreur += "- UUID Manquant. \n";
			isComplete = false;
		}
		
		if (isComplete === false) {
			
			showNotification(message_erreur, "error", "", 0);
			return;
		}
		else{
			setLoading(true);
			try {
				const cryptoName = selectedCryptoObject.crypto_name;
				const cryptoId = selectedCryptoObject.crypto_id;
				const dateTransaction = convertDateFormatForDb(transactionDate);
				const purchasePrice = usdValue / cryptoQuantity;

				const response = await postRequest("api.php", {
					uuid: loggedInValue, // Utilisez AsyncStorage pour récupérer les valeurs stockées
					action: "add_transactions",
					token: cryptoName,
					tokenId: cryptoId,
					date: dateTransaction,
					invest: usdValue,
					supply: cryptoQuantity,
					location: capitalizeFirstLetter(location),
					purchasePrice:purchasePrice,
					transactionType:transactionType
				});

				if (response.success) {
					await fetchData();
					//console.log(updatedCryptos); // Vous devrie
					//setListCryptos(updatedCryptos);
					showNotification(response.message, "success", "", 0);
					setCryptoId("");
					setSearchTerm("");
	
				} else {
					showNotification(response.message, "error", "", 0);
				}
				setLoading(false);

			} catch (error) {
				setLoading(false);
				showNotification(message_erreur, "error", "", 0);
			}
			
		}
	}, [transactionType,cryptoQuantity, usdValue, location, transactionDate, selectedCrypto, listCryptos, showNotification, loggedInValue, setListTransactions,selectedCrypto]);

	function renderCryptoPickerItems() {
		if (listCryptos && listCryptos.length > 0) {
			return listCryptos.map((crypto) => (
				<Picker.Item
					key={crypto.crypto_name + "_" + crypto.crypto_id}
					label={crypto.crypto_name}
					value={crypto.crypto_id}
				/>
			));
		} else {
			return <Picker.Item label="Aucune crypto disponible" value="0" />;
		}
	}
   
	const handleGoBack = () => {
		navigation.goBack();
	  };

	function convertDateFormatForDb(dateString) {
		// Divise la chaîne de caractères en [jour, mois, année]
		const parts = dateString.split('-');
		// Réarrange les composants de la date en [année, mois, jour]
		const newDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
		return newDateString;
	}
	return (
		<View style={encodageStyles.containerEncodageTop}>
			<ScrollView style={encodageStyles.scrollView}>
				{/* Ajout Transaction */}

				<View style={encodageStyles.section}>
					<View style={encodageStyles.sectionTitleContainer}>
						<Text style={encodageStyles.sectionTitle}>Ajout Transaction</Text>
						<TouchableOpacity onPress={handleGoBack}>
							<FontAwesome5  name="times-circle" size={24} color="red" />
						</TouchableOpacity>
					</View>
					
					<View style={encodageStyles.viewCryptoPicker}>
						<Text style={encodageStyles.label}>Cryptos: </Text>
						<Picker 
							key={JSON.stringify(listCryptos)}
							selectedValue={selectedCrypto}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedCrypto(itemValue)
							}
							style={{ ...encodageStyles.pickerCrypto, color: 'white' }}
						>
							{renderCryptoPickerItems()}
						</Picker>
					</View>

					<View style={encodageStyles.viewCryptoInput}>
						<Text style={encodageStyles.label}>Quantité de Crypto: </Text>
						<TextInput
							style={encodageStyles.input}
							placeholder="Quantité"
							keyboardType="numeric"
							value={cryptoQuantity}
							onChangeText={setCryptoQuantity}
							placeholderTextColor="#ffffff"
						/>
					</View>

					<View style={encodageStyles.viewCryptoInput}>
						<Text style={encodageStyles.label}>Valeur en USD: </Text>
						<TextInput
							style={encodageStyles.input}
							placeholder="Investissement en $"
							keyboardType="numeric"
							value={usdValue}
							onChangeText={setUsdValue}
							placeholderTextColor="#ffffff"
						/>
					</View>

					<View style={encodageStyles.viewCryptoPicker}>
						<Text style={encodageStyles.label}>Type de transaction: </Text>
						<Picker
							selectedValue={transactionType}
							onValueChange={(itemValue, itemIndex) =>
								setTransactionType(itemValue)
							}
							style={{ ...encodageStyles.pickerCrypto, color: 'white' }}
						>
							<Picker.Item label="Achat" value="achat" />
							<Picker.Item label="Vente" value="vente" />
						</Picker>
					</View>

					<View style={encodageStyles.viewCryptoInput}>
						<Text style={encodageStyles.label}>Location: </Text>
						<TextInput
							style={encodageStyles.input}
							placeholder="Location"
							value={location}
							onChangeText={setLocation}
							placeholderTextColor="#ffffff"
						/>
					</View>

					<View style={encodageStyles.viewCryptoDate}>
						<View style={encodageStyles.viewCryptoDate}>
							<Text style={encodageStyles.label}>Date de Transaction: </Text>
							<TouchableOpacity onPress={showDatepicker} style={encodageStyles.datePickerButton}>
								<Text style={encodageStyles.datePickerButtonText}>{transactionDate}</Text>
							</TouchableOpacity>
							{show && (
								<DateTimePicker
								testID="dateTimePicker"
								value={date}
								mode={'date'}
								is24Hour={true}
								display="default"
								onChange={onChange}
								/>
							)}
						</View>
					
						
					
					</View>

					<TouchableOpacity
						style={encodageStyles.button}
						onPress={handleAddTransaction}
					>
						<Text style={encodageStyles.buttonText}>Soumettre Transaction</Text>
					</TouchableOpacity>
				</View>

				{/* Ajout cryptos */}
				<View style={encodageStyles.section}>
					<Text style={encodageStyles.sectionTitle}>Ajout cryptos</Text>

					<View style={encodageStyles.searchContainer_crypto}>
						<Text style={encodageStyles.labelAddCrypto}>Nom de la crypto:</Text>
						<View style={encodageStyles.row}>
							<TextInput
								style={encodageStyles.input_search_crypto}
								placeholder="Nom de la crypto"
								value={searchTerm}
								onChangeText={setSearchTerm}
								placeholderTextColor="#ffffff"
							/>
							<TouchableOpacity onPress={handleSearchClick}>
								<FontAwesome5 name="search" size={24} color="white" />
							</TouchableOpacity>
						</View>

						{foundTokens.length > 0 && (
							<Modal
								animationType="slide"
								transparent={true}
								visible={isModalVisible}
								onRequestClose={() => {
									setModalVisible(!isModalVisible);
								}}
							>
								<View style={encodageStyles.modalOverlay}>
									<View style={encodageStyles.modalBox}>
										<FlatList
											data={foundTokens}
											keyExtractor={(item) => item.data.id.toString()}
											renderItem={({ item }) => (
												<TouchableOpacity
													style={encodageStyles.modalItem}
													onPress={() => handleSelectToken(item)}
												>
													{/* Enveloppez l'image et le texte dans une View avec flexDirection: 'row' */}
													<View
														style={{
															flexDirection: "row",
															alignItems: "center",
														}}
													>
														<Image
															source={{ uri: item.data.image }}
															style={encodageStyles.modalItemImage}
															resizeMode="contain"
														/>
														<Text style={encodageStyles.modalItemText}>
															{`${item.data.name} (${
																item.data.current_price
																	? parseFloat(
																			item.data.current_price.toFixed(6)
																	  )
																	: "N/A"
															}$) ${item.data.symbol}`}
														</Text>
													</View>
												</TouchableOpacity>
											)}
										/>
									</View>
								</View>
							</Modal>
						)}
					</View>

					<View style={encodageStyles.searchContainer_crypto_id}>
						<Text style={encodageStyles.labelAddCrypto}>Id Crypto:</Text>
						<TextInput
							style={encodageStyles.input}
							placeholder="ID de la crypto"
							value={cryptoId}
							onChangeText={setCryptoId}
							placeholderTextColor="#ffffff"
							// Ajoutez les autres propriétés nécessaires ici
						/>
					</View>

					<TouchableOpacity
						style={encodageStyles.button}
						onPress={handleAddCrypto}
					>
						<Text style={encodageStyles.buttonText}>Ajouter Crypto</Text>
					</TouchableOpacity>
				</View>
				
			</ScrollView>
		</View>
	);
}

export default memo(CryptoEncodage);
