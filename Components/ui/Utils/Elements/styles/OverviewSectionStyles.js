
import { StyleSheet } from 'react-native';

export const overviewSectionStyles = StyleSheet.create({
  
  overviewContainer:  {
    width: '100%',
    backgroundColor: '#1c1a1d', // Fond sombre
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {  
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    marginBottom: 20,
  },
  button  : {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton : {
    color: 'white',
  },

  overviewContainer : {
    width: '100%',
    backgroundColor: '#1c1a1d', // Fond sombre
    padding: 0,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tableContainer: {
    borderWidth: 1,
		borderColor: "#cccccc",
    marginTop: 10,
		marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    padding: 5,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    // Additional styles
  },
  headerText: {
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    // Additional styles
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Additional styles
  },
  rowText: {
    // Additional styles
  }
});


