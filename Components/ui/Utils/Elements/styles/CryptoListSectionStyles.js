
import { StyleSheet } from 'react-native';

export const cryptoListSectionStyles = StyleSheet.create({
  
  cryptoListContainer: {
    flex: 1,
    backgroundColor: '#1c1a1d', // Fond sombre
    padding: 10,
  },
  cryptoListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    color: '#ffffff',
    fontSize: 8,
    flex: 1,
    textAlign: 'center',
  }, 
  logo: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#4287f5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


