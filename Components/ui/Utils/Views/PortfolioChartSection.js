// OverviewSection.js
import React, {  useContext, useState, useEffect, memo ,useCallback  } from "react";
import {
	View,
	Text,

	 
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

import { portfolioChartSectionStyles } from '../Elements/styles/PortfolioChartSectionStyles';
import { DataContext } from '../../../../Context/DataContext'; 


const PortfolioChartSection = memo(() => {
  const {	listTransactions	} = useContext(DataContext);

  const [fontSize, setFontSize] = useState(14);
  const [fontSizex, setFontSizex] = useState(10);
  const [tooltipFontSize, setTooltipFontSize] = useState(12);
  const [scatterSize, setScatterSize] = useState(3);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
      if (listTransactions && listTransactions.generalChartData) {
          const chartData = Object.entries(listTransactions.generalChartData).map(([date, values]) => ({
              date: new Date(date),
              totalInvested: values.totalInvested,
              totalDollarValue: values.totalDollarValue,
              infosTransactions: values.infosTransactions,
          }));
          const sortedData = chartData.sort((a, b) => a.date - b.date);
          setTransformedData(sortedData);
      }
  }, [listTransactions]);

  /**
     * Renvoie une chaîne de caractères contenant les informations sur les transactions.
     * @param {Array} transactions - Les transactions à afficher.
     * @returns {string} - Les informations sur les transactions.
     */
  const renderTransactions = useCallback((transactions) => {
    return transactions.map(tr => {
      let symbol = tr.type === 'achat' ? '🟢' : '🔴';
      return `${symbol} Jeton: ${tr.token}
          Investi: ${tr.tokenInvest}$
          Prix d'achat: ${tr.purchasePrice}$
          Location: ${tr.location_crypto}$
          Quantité: ${tr.tokenSupply}`;
    }).join('\n\u200B\n\u200B\n');
  }, []);

  /**
   * Détermine la couleur des pastilles en fonction des transactions.
   * @param {Object} datum - Les données du graphique.
   * @returns {string} - La couleur des pastilles.
   */
  const determineColor = (datum) => {
      if (datum.datum.infosTransactions && datum.datum.infosTransactions.some(tr => tr.type === 'vente')) {
          return "red";
      } else {
          return "grey"; // couleur par défaut si aucun critère n'est rempli
      }
  };

  return (
    <View style={portfolioChartSectionStyles.chartContainer}>
      {transformedData.length > 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          height={280}
          padding={{ top: 10, bottom: 30, right: 40, left: 70 }}
          domainPadding={20}
          containerComponent={<VictoryZoomContainer />}>
          <VictoryAxis
            tickFormat={(x) => {
              const date = new Date(x);
              const year = date.getFullYear().toString().slice(-2); // Prend les deux derniers chiffres de l'année
              return `${date.getDate()}/${date.getMonth() + 1}/${year}`;
            }}
            style={{ tickLabels: { fontSizex } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => {
              if (y >= 1000) {
                const thousands = y / 1000;
                const rounded = Math.round(thousands * 10) / 10; // Arrondit à la décimale la plus proche
                if (rounded % 1 === 0) { // Si le nombre est entier, n'affichez pas de décimale
                  return `${rounded}k`;
                } else {
                  return `${rounded.toFixed(1)}k`.replace('.', 'k'); // Remplace le point décimal par "k"
                }
              }
              return `$${y}`; // Pour les valeurs inférieures à 1000, renvoyez le format original
            }}
            style={{ tickLabels: { fontSize } }}
            tickLabelComponent={<VictoryLabel dx={5} />}
          />

          <VictoryLine
            data={transformedData}
            x="date"
            y="totalInvested"
            style={{
              data: { stroke: "#f54242" }
            }}
          />
          <VictoryLine
            data={transformedData}
            x="date"
            y="totalDollarValue"
            style={{
              data: { stroke: "#4287f5" }
            }}
          />
         {/*  <VictoryScatter
            data={transformedData}
            x="date"
            y="totalDollarValue"
            size={scatterSize}
            style={{ data: { fill: (datum) => determineColor(datum) } }}
            labels={({ datum }) => {
              let transactionsInfo = renderTransactions(datum.infosTransactions);
              return `
                Date: ${datum.date.toLocaleDateString()}
                Montant investi: $${datum.totalInvested}
                Valeur des actifs: $${datum.totalDollarValue}
                ---
                Transactions:
                ${transactionsInfo}
              `;
            }}
            labelComponent={
              <VictoryTooltip 
                style={{ fontSize: tooltipFontSize }}
                flyoutStyle={{ padding: 0 }} // Ajustez cette valeur selon vos besoins
              />
            }
          />*/}
          <VictoryLegend x={80} y={0}
            orientation="horizontal"
            gutter={10}
            style={{ labels: { fontSize: fontSize  } }}
            data={[
              { name: "Montant investi", symbol: { fill: "#f54242" }},
              { name: "Valeur des actifs", symbol: { fill: "#4287f5" }}
            ]}
          />
        </VictoryChart>
      )}
    </View>
  );
});

export default PortfolioChartSection;
