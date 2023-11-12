import React, { createContext, useState, useContext } from 'react';
import { View, Modal, StyleSheet, Text, Animated, Dimensions } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Assurez-vous d'avoir installé react-native-vector-icons


// Creating the Spinner context
const SpinnerContext = createContext();

// A hook to use the Spinner context
export const useSpinner = () => useContext(SpinnerContext);

// Spinner component that will be displayed when loading
const SpinnerComponent = () => {
  const { isLoading } = useSpinner();
  const rotateValueHolder = new Animated.Value(0);
  const fadeInValue = new Animated.Value(0);

  // Obtenez les dimensions de l'écran à l'intérieur de la fonction
  const { width, height } = Dimensions.get('window');


  
  // Animation de rotation pour l'icône Bitcoin
  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false, // 'true' n'est pas supporté pour l'animation de rotation
    }).start(() => startImageRotateFunction());
  };

  // Animation de fondu pour le texte
  const fadeIn = () => {
    fadeInValue.setValue(0);
    Animated.timing(fadeInValue, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => fadeIn());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fadeInData = fadeInValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (isLoading) {
    startImageRotateFunction();
    fadeIn();
  }

  if (!isLoading) return null;

  return (
    <Modal
      transparent
      animationType='none'
      visible={isLoading}
    >
      <View style={[styles.modalBackground, { width, height }]}>
        <Animated.View style={styles.activityIndicatorWrapper}>
          <Animated.Image
            style={{ transform: [{ rotate: rotateData }], width: 100, height: 100 }}
            source={require('../assets/btc.png')} // Remplacez par le chemin vers votre image Bitcoin
          />
          <Animated.Text style={[styles.loadingText, { opacity: fadeInData }]}>
            Le bitcoin fera aux banques ce que les e-mails ont fait au secteur postal
          </Animated.Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

// The provider component that will wrap the whole app
export const SpinnerProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, setLoading }}>
      <SpinnerComponent />
      {children}
    </SpinnerContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond semi-transparent
   
  },
  activityIndicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});
