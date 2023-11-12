import { StyleSheet } from 'react-native';



export const encodageStyles = StyleSheet.create({
    containerEncodageTop: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#121212', // Fond sombre
        width: '100%',
        color: '#ffffff',
        marginTop: 0,

    },
    section: {
		
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
		marginBottom: 20,
		alignItems: "center",
        width: '100%',
        color: '#ffffff',
        borderWidth: 1,
		borderColor: "#1c1a1d",
		borderRadius: 5,
		padding: 20,
        backgroundColor: '#1c1a1d', // Fond sombre
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
        color: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        color: 'green',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
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
      },

    scrollView : {
        backgroundColor: '#121212',
        width: '100%',
        color: '#ffffff',
    },

    viewCryptoPicker: { 
        flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
		marginTop: 5,
        width: '100%',
        color: '#ffffff',
    },

    label: {
		fontSize: 14,
        color: '#ffffff',
        padding: 3,
        paddingBottom: 0,
        paddingTop: 0,
        marginBottom: 0,
        marginTop: 0,
	},
    pickerCrypto:{
        flex: 1,
        borderWidth: 1, // Ceci définit l'épaisseur de la bordure
        borderColor: "#fff", // Ceci définit la couleur de la bordure en blanc
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8, // Vous pouvez ajuster la hauteur de la bordure interne ici si nécessaire
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 0,
        marginTop: 0,
        backgroundColor: 'transparent', // Assurez-vous que l'arrière-plan est transparent pour que la bordure soit visible
        padding: 10,
    },

    viewCryptoInput: { 
        flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
		marginTop: 5,
        width: '100%',
        color: '#ffffff',
    },

    input: {
		flex: 1, // Permet à l'input de prendre tout l'espace horizontal disponible
		marginRight: 10, // Ajoute un peu d'espace entre l'input et le bouton
		width: "100%", // Utilisez toute la largeur disponible
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 3,
        paddingBottom: 0,
        paddingTop: 0,
		fontSize: 14,
		marginBottom: 0, // Espace après l'input
        marginLeft: 5,
        color: '#ffffff',
	},

    datePickerButton: {
        
        padding: 10, // Ajoutez un peu de padding pour la visibilité
        borderWidth: 1,
        borderColor: "#ffffff", // Assurez-vous que cette couleur contraste avec l'arrière-plan
        borderRadius: 5,
      },
      datePickerButtonText: {
        color: '#ffffff',
        // Retirez les propriétés de bordure d'ici
      },
    viewCryptoDate: { 
        flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
		marginTop: 5,
        width: '100%',
        color: '#ffffff',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        },
        buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },

    searchContainer_crypto: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
		marginTop: 5,
        color: '#ffffff',
	},
	searchContainer_crypto_id: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
		width: "100%", // Utilisez toute la largeur disponible
		marginTop: 5,
        color: '#ffffff',
	},

    row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
        color: '#ffffff',
	},

    labelAddCrypto: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 10,
        color: '#ffffff',
        marginBottom: 4,
    },

    input_search_crypto: {
		flex: 1, // Permet à l'input de prendre tout l'espace horizontal disponible
		marginRight: 10, // Ajoute un peu d'espace entre l'input et le bouton
		width: "100%", // Utilisez toute la largeur disponible
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 4,
		fontSize: 14,
        color: '#ffffff',
		marginBottom: 5, // Espace après l'input
		// ... vos autres styles pour input ...
	},


    searchResults: {
		backgroundColor: "#fff", // Fond blanc
		borderColor: "#cccccc", // Bordure
		borderWidth: 1,
        color: '#ffffff',
		//height: 200, // Hauteur fixe
		// style pour la zone d'affichage des résultats de recherche
	},

    searchResultItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
        color: '#ffffff',
	},

    /* Modal  */
    // ... Autres styles ...

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(28, 28, 28, 0.5)',
    },
    modalBox: {
        width: '100%',
        backgroundColor: 'rgba(58, 58, 58, 1)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        width: '100%',
        backgroundColor: 'rgba(58, 58, 58, 1)',
    },
    modalItemText: {
        fontSize: 14,
        color: '#ffffff',
    },
  
    modalItemImage: {
        width: 20, // Ajustez la taille comme nécessaire
        height: 20, // Ajustez la taille comme nécessaire
        marginRight: 10, // Espace entre l'image et le texte
    },

    loadingContainer: {
            position: 'absolute', // ou 'relative' selon vos besoins
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
        },

    
    /* Fin de modal */
});