import React, { useState, useEffect, useCallback, memo, useContext } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"; // Assurez-vous d'installer cette dépendance
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	Alert 
	 
} from "react-native";

import {
	VictoryChart,
	VictoryTheme,
	VictoryZoomContainer,
	VictoryAxis,
	VictoryLine,
	VictoryScatter,
	VictoryTooltip,
	VictoryLegend,
	VictoryLabel
  } from 'victory-native';

import moment from 'moment';

import { useNotification } from "../../../Context/NotificationContext";

import { detailsCryptoStyles } from "./Elements/styles/DetailsCryptoStyles";

import { DataContext } from '../../../Context/DataContext'; // Assurez-vous que le chemin est correct
import { useSpinner } from "../../../Context/SpinnerContext";
import { postRequest } from "../../../Context/Services"; // Assurez-vous que le chemin est correct



function DetailsCrypto({ route, navigation }) {
	const { tokenId } = route.params;
	const { showNotification } = useNotification();
	
	const { setLoading } = useSpinner();
	const [selectedTokenDetails, setSelectedTokenDetails] = useState(null);
	const [isProfit, setIsProfit] = useState(null);

	
	// Préparation des données pour le graphique
	const [cryptoAmountData, setCryptoAmountData] = useState([]);
	const [investedAmountData, setInvestedAmountData] = useState([]);
	const [dollarValueData, setDollarValueData] = useState([]);

	const [fontSize, setFontSize] = useState(14);
 	 const [fontSizex, setFontSizex] = useState(10);
	

	const {
		loggedInValue,
		listTransactions,		
		fetchData,
	  } = useContext(DataContext);

	

	useEffect(() => {
	//	console.log("listTransactions", listTransactions);
		if (listTransactions ) {
			
			const tokenDetails = listTransactions.cryptos.find(crypto => crypto.tokenId === tokenId);
			//console.log("tokenDetails", tokenDetails)
			if (tokenDetails) {
				setSelectedTokenDetails(tokenDetails);
				if(tokenDetails["total_p&l_usd"] >= 0){
					setIsProfit(true);
				}
				else{
					setIsProfit(false);
				}

				/* Graphique */
				const chartData = tokenDetails.chartData;
				const transformedChartData = Object.entries(chartData).map(([dateString, data]) => {
					const date = moment(dateString.split(' ')[0], "YYYY-MM-DD").toDate();
					return {
						date,
						cryptoAmount: data.cryptoAmount,
						investedAmount: data.investedAmount,
						dollarValue: data.dollarValue
					};
				}).sort((a, b) => a.date - b.date);

				// Vous pouvez maintenant utiliser transformedChartData pour vos graphiques
				// Par exemple, pour le graphique de la quantité de crypto :
				setCryptoAmountData(transformedChartData.map(item => ({ x: item.date, y: item.cryptoAmount })));
				setInvestedAmountData(transformedChartData.map(item => ({ x: item.date, y: item.investedAmount })));
				setDollarValueData(transformedChartData.map(item => ({ x: item.date, y: item.dollarValue })));

				

				// Faites de même pour les autres données
            // ...
			//	console.log("cryptoAmountData", cryptoAmountData);
			//	console.log("investedAmountData", investedAmountData);
			//	console.log("dollarValueData", dollarValueData);
			
			} else {
				showNotification(`Détails non trouvés pour le token ${tokenId}`, "error", "", 0);
			}
		}
	}, [listTransactions]);

	const handleGoBack = () => {
		navigation.goBack();
	  };


	  
	function formatDateShortYearToView(dateString) {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear().toString().substr(-2); // Prendre les deux derniers chiffres de l'année
		return `${day}/${month}/${year}`;
	}

	

	// Fonction à exécuter lorsque l'utilisateur confirme
	const handleConfirmDeleteTransaction = async (id) => {
		if (!id) {
			showNotification(
				"Il manque l'id de la transaction.",
				"error",
				"",
				0
			);
			return;
		}

		try {
			setLoading(true);
			const response = await postRequest("api.php", {
				uuid: loggedInValue, 
				action: "delete_transaction",
				transaction_id: id,
			});

			if (response.success && response.message.length > 0) {
				await fetchData();
				setLoading(false); 
				showNotification(response.message, "success", "", 0);
			} else {
				setLoading(false); 
				showNotification(response.message, "error", "", 0);
			}
			setLoading(false); // Arrêtez le chargemen
		} catch (error) {
			showNotification(error.message || "Une erreur est survenue.", "error", "", 0);
			setLoading(false);
		}
		

	}

	const showConfirmDialog = (id, onConfirm) => {
		
		return Alert.alert(
			"Confirmer l'action",
			`Êtes-vous sûr de vouloir faire cela pour l'ID ${id} ?`,
			[
				{
					text: "Annuler",
					onPress: () => console.log("Annulation demandée"),
					style: "cancel"
				},
				{ 
					text: "OK", 
					onPress: () => onConfirm(id) 
				}
			],
			{ cancelable: false }
		);
	}

	return (
		<View style={detailsCryptoStyles.containerEncodageTop}>
			{selectedTokenDetails  && (
			<ScrollView style={detailsCryptoStyles.scrollView}>
				<View style={detailsCryptoStyles.sectionTitleContainer}>
					<Text style={detailsCryptoStyles.sectionTitle}>Details Crypto : {selectedTokenDetails.tokenName}  </Text>
					<TouchableOpacity onPress={handleGoBack}>
						<FontAwesome5  name="times-circle" size={24} color="red" />
					</TouchableOpacity>
				</View>
				<View style={detailsCryptoStyles.ContainerDetailCryptoHeader}>
					<View style={detailsCryptoStyles.sectionResumeDetailsCrypto}>
						<Text style={detailsCryptoStyles.row_left}>{selectedTokenDetails.tokenName}</Text>
						<Image style={detailsCryptoStyles.logo} source={{ uri: selectedTokenDetails.image }} />
					</View>
					<View style={detailsCryptoStyles.sectionResumeDetailsCrypto}>
						<Text style={detailsCryptoStyles.row_left}>ATH: {parseFloat(selectedTokenDetails.ath.toFixed(6)).toString()} $</Text>
						<Text style={detailsCryptoStyles.row_right}>Prix: {parseFloat(selectedTokenDetails.lastPrice.toFixed(6)).toString()} $</Text>
					</View>
				</View>
				
				<View style={detailsCryptoStyles.ContainerDetailCryptoResume}>
					<View style={detailsCryptoStyles.tableHeader}>
						<Text style={detailsCryptoStyles.headerText}>Investi.</Text>
						<Text style={detailsCryptoStyles.headerText}>Supply.</Text>
						<Text style={detailsCryptoStyles.headerText}>P&L $</Text>
						<Text style={detailsCryptoStyles.headerText}>P&L %</Text>
						<Text style={detailsCryptoStyles.headerText}>Prix~</Text>
						<Text style={detailsCryptoStyles.headerText}>Valeur</Text>
					</View>
					{selectedTokenDetails && selectedTokenDetails.totalInvest !== undefined && selectedTokenDetails["total_p&l_usd"] !== null && (
					<View style={[detailsCryptoStyles.tableRow, { backgroundColor: isProfit ? 'green' : 'red' }]}>
						<Text style={detailsCryptoStyles.rowText}>{parseFloat(selectedTokenDetails.totalInvest.toFixed(2)).toString() || 0}$</Text>
						<Text style={detailsCryptoStyles.rowText}>{parseFloat(selectedTokenDetails.totalSupply.toFixed(6)).toString() || 0}</Text>
						<Text style={detailsCryptoStyles.rowText}>{parseFloat(selectedTokenDetails["total_p&l_usd"].toFixed(2)).toString() || 0}$</Text>
						<Text style={detailsCryptoStyles.rowText}>{parseFloat(selectedTokenDetails["total_p&l_pourcent"].toFixed(2)).toString() || 0}%</Text>
						<Text style={detailsCryptoStyles.rowText}>{parseFloat(selectedTokenDetails.averagePrice.toFixed(6)).toString() || 0}$</Text>
						<Text style={detailsCryptoStyles.rowText}>{parseFloat( parseFloat(selectedTokenDetails.totalSupply) *  parseFloat(selectedTokenDetails.lastPrice)).toFixed(2) || 0}$</Text>
					</View>
					)}
				</View>
				<View style={detailsCryptoStyles.ContainerDetailCryptoTransaction}>
					<View style={detailsCryptoStyles.tableHeaderTransaction}>
						<Text style={detailsCryptoStyles.headerTextTransaction1}>Date</Text>
						<Text style={detailsCryptoStyles.headerTextTransaction2}>Invest. $</Text>
						<Text style={detailsCryptoStyles.headerTextTransaction3}>Supply</Text>
						<Text style={detailsCryptoStyles.headerTextTransaction4}>Prix Achat$</Text>
						<Text style={detailsCryptoStyles.headerTextTransaction5}>  Type</Text>
						<Text style={detailsCryptoStyles.headerTextTransaction6}>Location</Text>
						<Text style={detailsCryptoStyles.headerTextTransactionAction}></Text>
					</View>

					{selectedTokenDetails.transaction.map((transaction, index) => (
					<View 
						key={index} 
						style={[
							detailsCryptoStyles.tableRowTransaction,
							transaction.transactionType === "achat" ? detailsCryptoStyles.transactionAchat : 
							transaction.transactionType === "vente" ? detailsCryptoStyles.transactionVente : {}
						]}
						>
						<Text style={detailsCryptoStyles.rowTextTransaction}>{formatDateShortYearToView(transaction.date)}</Text>
						<Text style={detailsCryptoStyles.rowTextTransaction}>{parseFloat(transaction.invest.toFixed(6)).toString() || 0} </Text>
						<Text style={detailsCryptoStyles.rowTextTransaction}>{parseFloat(transaction.supply.toFixed(6)).toString() || 0}</Text>
						<Text style={detailsCryptoStyles.rowTextTransaction}>{parseFloat(transaction.purchasePrice.toFixed(6)).toString() || 0}</Text>
						<Text style={detailsCryptoStyles.rowTextTransaction}>{transaction.transactionType}</Text>
						<Text style={detailsCryptoStyles.rowTextTransaction}>{transaction.location_crypto}</Text>
						<TouchableOpacity onPress={() =>  showConfirmDialog(transaction.id, handleConfirmDeleteTransaction)} >
							<FontAwesome5 style={detailsCryptoStyles.corbeille} name="trash-alt" size={20} color="red" />
						</TouchableOpacity>
					</View>
				))}	

				</View>

				<View style={detailsCryptoStyles.ContainerDetailCryptoGraph}>
            <Text style={detailsCryptoStyles.graphTitle}>Quantité de Crypto</Text>
            <VictoryChart
                theme={VictoryTheme.material}
               
                domainPadding={10}
            >
                <VictoryAxis tickFormat={(t) => `${new Date(t).getDate()}/${new Date(t).getMonth() + 1}`} />
                <VictoryAxis dependentAxis />
				{/* <VictoryLine data={testData} style={{ data: { stroke: "#c43a31" } }} />*/
				console.log(cryptoAmountData)
				}
               <VictoryLine
                    data={cryptoAmountData}
                    style={{ data: { stroke: "#c43a31" } }}
                /> 
				<VictoryLegend x={80} y={0}
					orientation="horizontal"
					gutter={10}
					style={{ labels: { fontSize: fontSize  } }}
					data={[
						{ name: "Quantité de Cryptos", symbol: { fill: "#c43a31" }}
					]}
				/>
            </VictoryChart>
        </View>

        <View style={detailsCryptoStyles.ContainerDetailCryptoGraph}>
            <Text style={detailsCryptoStyles.graphTitle}>Valeurs Financières en USD</Text>
            <VictoryChart
                theme={VictoryTheme.material}
               
                domainPadding={10}
            >
                <VictoryAxis tickFormat={(t) => `${new Date(t).getDate()}/${new Date(t).getMonth() + 1}`} />
                <VictoryAxis dependentAxis />
                <VictoryLine
                    data={investedAmountData}
                    style={{ data: { stroke: "blue" } }}
                />
                <VictoryLine
                    data={dollarValueData}
                    style={{ data: { stroke: "green" } }}
                />

				<VictoryLegend x={40} y={10}
					orientation="horizontal"
					gutter={20}
					style={{ border: { stroke: "black" }, labels: { fontSize: fontSize + 2 } }}
					data={[
						{ name: "Montant investi", symbol: { fill: "blue" } },
						{ name: "Valeur des actifs", symbol: { fill: "green" } }
					]}
				/>

            </VictoryChart>
        </View>
				
				
			</ScrollView>
			)}
		</View> 
	);
}

const styles = StyleSheet.create({
	
	box: {
	  height: 200,
	  justifyContent: 'center',
	  alignItems: 'center',
	  margin: 10,
	  backgroundColor: '#ddd',
	},
	
  });

export default memo(DetailsCrypto);

