import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postRequest } from './Services'; // Assurez-vous que le chemin est correct

const AuthContext = createContext();

const cleanValue = (value) => value.replace(/"/g, '');

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            let uuid = await AsyncStorage.getItem('loggedIn');
            let email = await AsyncStorage.getItem('email');

            if (uuid && email) {
                try {
                    uuid = cleanValue(uuid);
                    email = cleanValue(email);
                    const data = await postRequest('api.php', { uuid, email, action: 'isauth' });
                    
                    if(data.success == true){
                        
                        setIsAuthenticated(true);
                        setIsLoading(false);
                    }
                    else{
                        setIsAuthenticated(false);
                        setIsLoading(false);
                    }
                    
                    
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
