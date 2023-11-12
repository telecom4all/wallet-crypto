import React, { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SidebarContent from "./Utils/Sidebar"; // Assurez-vous que le chemin est correct
//import AsyncStorage from "@react-native-async-storage/async-storage";

import CryptoEncodage from "./Utils/CryptoEncodage"; // Assurez-vous que le chemin est correct
//import { postRequest } from "../../Context/Services"; // Assurez-vous que le chemin est correct
//import { useNotification } from "../../Context/NotificationContext";
//import { useSpinner } from "../../Context/SpinnerContext";

import { useNavigation } from "@react-navigation/native";
import { sharedStyles } from "./Utils/Elements/styles/SharedStyles";
import { homeComponentStyles } from "./Utils/Elements/styles/HomeComponentStyles";

import OverviewSection from '../ui/Utils/Views/OverviewSection'; 
import PortfolioChartSection from '../ui/Utils/Views/PortfolioChartSection'; 
import CryptoListSection from '../ui/Utils/Views/CryptoListSection';
import { DataContext } from '../../Context/DataContext'; // Assurez-vous que le chemin est correct

const Drawer = createDrawerNavigator();



function HomeComponent() {
	const navigation = useNavigation();
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

	  
	// Utiliser useEffect pour appeler fetchData lors du montage du composant
	useEffect(() => {
		fetchData();
	  }, [fetchData]);

	

	function CryptoEncodageScreen({
		route: {
			params: {
				navigation 
			},
		},
	}) {
		return (
			<CryptoEncodage
				
				navigation ={navigation }
			/>
		);
	}

	function DetailsCryptoScreen({ route, navigation }) {
		const { tokenId } = route.params;
	  
		return (
		  <DetailsCrypto
			navigation={navigation}
			tokenId={tokenId}
		  />
		);
	  }

	function showDetailTransactionToken(tokenId) {
		navigation.push('DetailsCrypto', { tokenId: tokenId });
		
	  }
	


	function MainContent() {
	
	
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity
				style={homeComponentStyles.buttonEncodage}
				onPress={() => navigation.push("EncodageCrypto", {})}
			>
				<Text style={homeComponentStyles.buttonEncodageText}>Encodage</Text>
			</TouchableOpacity>
			<OverviewSection />
			<PortfolioChartSection />
			<View style={styles.containerCryptoList}>
				
				<View style={styles.columnTitles}>
					<Text style={styles.titleText}>Token</Text>
					<Text style={styles.titleText}>logo</Text>
					<Text style={styles.titleText}>Supply</Text>
					<Text style={styles.titleText}>Invest</Text>
					<Text style={styles.titleText}>Avg Price</Text>
					<Text style={styles.titleText}>Last Price</Text>
					<Text style={styles.titleText}>P&L $</Text>
					<Text style={styles.titleText}>P&L %</Text>
				</View>
				
				{
					listTransactions.cryptos && listTransactions.cryptos.map((crypto, index) => (
						<CryptoListSection key={index} crypto={crypto} showDetailTransactionToken={showDetailTransactionToken} />
					))
				}
      		</View> 
      
		</ScrollView>

	);
	}

	return (
		<Drawer.Navigator
			drawerContent={(props) => (
				<SidebarContent
					{...props}
					loggedInValue={loggedInValue}
					emailValue={emailValue}
					freeValue={freeValue}
					maticWalletValue={maticWalletValue}
				/>
			)}
		>
			<Drawer.Screen name="Wallet Crypto" component={MainContent} />
			<Drawer.Screen
				name="EncodageCrypto"
				component={CryptoEncodageScreen}
				options={{ title: "Encodage Crypto" }}
			/>
			<Drawer.Screen
				name="DetailsCrypto"
				component={DetailsCryptoScreen}
				options={{ title: "Details Crypto" }}
			/>
		</Drawer.Navigator>
	);
}


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: 'black',
	  alignContent: 'center',
	  width: '100%'
	},
	box: {
	  height: 200,
	  justifyContent: 'center',
	  alignItems: 'center',
	  margin: 10,
	  backgroundColor: '#ddd',
	},
	containerCryptoList	: {
		flex: 1,
		backgroundColor: '#1c1a1d', // Fond sombre
		padding: 10,
		width: '100%',
	},
	columnTitles: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
		backgroundColor: '#eee',
		width: '100%',
	  },
	  titleText: {
		fontWeight: 'bold',
		fontSize: 10,
		// autres styles pour les titres...
	  },
  });
  
export default HomeComponent;
