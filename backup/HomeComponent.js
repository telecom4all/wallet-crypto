import React, { useEffect, useContext } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import SidebarContent from "./Utils/Sidebar"; // Vérifiez le chemin
import CryptoEncodage from "./Utils/CryptoEncodage"; // Vérifiez le chemin
import { sharedStyles } from "./Utils/Elements/styles/SharedStyles";
import { homeComponentStyles } from "./Utils/Elements/styles/HomeComponentStyles";
import { DataContext } from '../../Context/DataContext'; // Vérifiez le chemin
import OverviewSection from '../ui/Utils/Views/OverviewSection'; 
import PortfolioChartSection from '../ui/Utils/Views/PortfolioChartSection'; 
import CryptoListSection from '../ui/Utils/Views/CryptoListSection'; 

const Drawer = createDrawerNavigator();

function HomeComponent() {
  const {
    loggedInValue,
    emailValue,
    freeValue,
    maticWalletValue,
    listTransactions,
    fetchData,
  } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigation = useNavigation();

  function MainContent() {
    return (
      <ScrollView contentContainerStyle={homeComponentStyles.scrollContainer}>
        <TouchableOpacity
          style={homeComponentStyles.buttonEncodage}
          onPress={() => navigation.push("EncodageCrypto")}>
          <Text style={homeComponentStyles.buttonEncodageText}>Encodage</Text>
        </TouchableOpacity>
       {/* <OverviewSection />
        <PortfolioChartSection />
        listTransactions.cryptos && listTransactions.cryptos.map((crypto, index) => (
          <CryptoListSection key={crypto.tokenId} crypto={crypto} />
		))*/}
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
	  <Drawer.Screen name="Overview" component={OverviewSection} />
      <Drawer.Screen
        name="EncodageCrypto"
        component={CryptoEncodage}
        options={{ title: "Encodage Crypto" }}
      />
    </Drawer.Navigator>
  );
}

export default HomeComponent;
