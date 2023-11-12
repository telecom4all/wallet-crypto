
import { StyleSheet } from 'react-native';

export const detailsCryptoStyles = StyleSheet.create({
  containerEncodageTop : {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#121212', // Fond sombre
    width: '100%',
    color: '#ffffff',
    marginTop: 0,

  },
  scrollView : {
    backgroundColor: '#121212',
    width: '100%',
    color: '#ffffff',
  },
  sectionTitleContainer: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginRight: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
    color: '#ffffff',
   
    color: 'green',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  ContainerDetailCryptoHeader: {
    borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
		marginBottom: 20,
    marginTop: 10,
		alignItems: "center",
    flexDirection: 'column',
    width: '100%',
    color: '#ffffff',
    borderWidth: 1,
		borderColor: "#1c1a1d",
		borderRadius: 5,
		padding: 20,
    backgroundColor: '#1c1a1d', // Fond sombre
  },

  sectionResumeDetailsCrypto: { 
    
		alignItems: "center",
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    
  },
  logo: {
    width: 40,
    height: 40,
    alignContent: 'space-around',
    marginRight: 20,
  },
  row_left: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
    marginLeft: 0,
    textAlign: 'left',
    alignContent: 'flex-start',
  },
  row_right: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
    alignContent: 'flex-end',
    textAlign: 'right',
  },

  ContainerDetailCryptoResume: {
    borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
		marginBottom: 20,
    marginTop: 10,
		alignItems: "center",
    flexDirection: 'column',
    width: '100%',
    color: '#ffffff',
    borderWidth: 1,
		borderColor: "#1c1a1d",
		borderRadius: 5,
		padding: 20,
    backgroundColor: '#1c1a1d', // Fond sombre
  },
  tableHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    // Additional styles
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:5,
    // Additional styles
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Additional styles
  },
  rowText: {
    marginLeft:5,
    flex: 1,
    color: '#ffffff', // Texte blanc
    fontSize: 10,
  },
  ContainerDetailCryptoTransaction: {
    borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
		marginBottom: 20,
    marginTop: 10,
		alignItems: "center",
    flexDirection: 'column',
    width: '100%',
    color: '#ffffff',
    borderWidth: 1,
		borderColor: "#1c1a1d",
		borderRadius: 5,
		padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#1c1a1d', // Fond sombre
  },

  transactionAchat: {
    backgroundColor: 'green',
  },
  transactionVente: {
    backgroundColor: 'orange',
  },
  tableHeaderTransaction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding:0,
    paddingLeft:10,
    // Additional styles
  },
  headerTextTransaction1: {
   
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:0,
    width:'14%'
    // Additional styles
  },
  headerTextTransaction2: {
   
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:10,
    width:'14%'
    // Additional styles
  },
  headerTextTransaction3: {
   
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:10,
    width:'14%'
    // Additional styles
  },
  headerTextTransaction4: {
   
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:0,
    width:'14%'
    // Additional styles
  },
  headerTextTransaction5: {
   
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:5,
    width:'14%'
    // Additional styles
  },
  headerTextTransaction6: {
   
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    marginLeft:5,
    width:'14%'
    // Additional styles
  },
  tableRowTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    // Additional styles
  },
  rowTextTransaction: {
    marginLeft:5,
    width:'14%',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
  },
  headerTextTransactionAction: {  
    flex: 1,
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    fontSize: 10,
    width:0
    // Additional styles
  },
  corbeille: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  ContainerDetailCryptoGraph : {
    borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
		marginBottom: 20,
    marginTop: 10,
		alignItems: "center",
    flexDirection: 'column',
    width: '100%',
    color: '#ffffff',
    borderWidth: 1,
		borderColor: "#1c1a1d",
		borderRadius: 5,
		padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#1c1a1d', // Fond sombre
  },
  graphTitle: { 
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
    color: '#ffffff',
    marginBottom: 10,
    marginTop: 10,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});


