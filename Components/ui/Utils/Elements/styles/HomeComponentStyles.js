
import { StyleSheet } from 'react-native';

export const homeComponentStyles = StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Fond sombre
  },

  containerTop: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212', // Fond sombre
    scrollEnabled: true,
    
  },

  scrollContainer: {  
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
},
  /* Fin de Container */
  /* Form */

  /* Fin de Form  */

  /* Titre */
  superHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // Texte blanc
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Texte blanc
    
  },
  /* Fin de Titre */
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  /* Boutton  */
  buttonEncodage: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  buttonEncodageText: {
    color: 'white',
    fontSize: 14,
  },
  
 
  
});


