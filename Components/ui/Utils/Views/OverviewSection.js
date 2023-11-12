// OverviewSection.js
import React, {  useContext } from "react";
import {
	View,
	Text
	 
} from "react-native";
import { overviewSectionStyles } from '../Elements/styles/OverviewSectionStyles';
import { DataContext } from '../../../../Context/DataContext'; 


function OverviewSection() {
  const {
		listTransactions,
		} = useContext(DataContext);

  

  const isProfit = listTransactions["total_p&l_dollar"] >= 0;

  return (
    
      
      
      <View style={overviewSectionStyles.tableContainer}>
        <View style={overviewSectionStyles.tableHeader}>
          <Text style={overviewSectionStyles.headerText}>Investi.</Text>
          <Text style={overviewSectionStyles.headerText}>P&L $</Text>
          <Text style={overviewSectionStyles.headerText}>P&L %</Text>
          <Text style={overviewSectionStyles.headerText}>Valeur</Text>
        </View>
        {listTransactions && listTransactions.totalInvestAllCrypto !== undefined && (
          <View style={[overviewSectionStyles.tableRow, { backgroundColor: isProfit ? 'green' : 'red' }]}>
            <Text style={overviewSectionStyles.rowText}>{parseFloat(listTransactions.totalInvestAllCrypto.toFixed(2)).toString() || 0}$</Text>
            <Text style={overviewSectionStyles.rowText}>{parseFloat(listTransactions["total_p&l_dollar"].toFixed(2)).toString() || 0}$</Text>
            <Text style={overviewSectionStyles.rowText}>{parseFloat(listTransactions["total_p&l_percent"].toFixed(2)).toString() || 0}%</Text>
            <Text style={overviewSectionStyles.rowText}>{parseFloat(listTransactions["totalValueAllCrypto"].toFixed(2)).toString() || 0}$</Text>
          </View>
        )}
      </View>
   
  );
}

export default OverviewSection;
