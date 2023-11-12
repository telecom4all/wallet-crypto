// OverviewSection.js
import React, {  useContext, useState, useEffect, memo ,useCallback  } from "react";

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { cryptoListSectionStyles } from '../Elements/styles/CryptoListSectionStyles';



function CryptoListSection({ crypto , showDetailTransactionToken}) {
  
  
 

  
  

  
  
  return (
    <TouchableOpacity 
      style={cryptoListSectionStyles.row} 
      onPress={() => showDetailTransactionToken(crypto.tokenId)}
    >
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>{crypto.tokenName.toUpperCase()}</Text>
      <Image style={cryptoListSectionStyles.logo} source={{ uri: crypto.image }} />
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>{parseFloat(crypto.totalSupply.toFixed(6)).toString() || 0}</Text>
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>{parseFloat(crypto.totalInvest.toFixed(6)).toString() || 0 } $</Text>
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>{parseFloat(crypto.averagePrice.toFixed(6)).toString() || 0 } $</Text>
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>{parseFloat(crypto.lastPrice.toFixed(6)).toString() || 0 }  $</Text>
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>
        {crypto["total_p&l_usd"].toFixed(2)}
      </Text>
      <Text style={[cryptoListSectionStyles.cell, { color: crypto["total_p&l_usd"] >= 0 ? 'green' : 'red' }]}>{crypto["total_p&l_pourcent"].toFixed(2)}%</Text>
    </TouchableOpacity>
  );
}

export default CryptoListSection;
