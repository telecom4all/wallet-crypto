import React, { createContext, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const navigation = useNavigation();
    const [notification, setNotification] = useState({
        message: '',
        type: '',
        visible: false,
        redirectUrl: '',
        timer: 0,
    });

    const showNotification = (message, type, redirectUrl = '', timer = 0) => {
        setNotification({ message, type, visible: true, redirectUrl, timer });

        if (timer > 0) {
            setTimeout(() => {
                hideNotification();
                if (redirectUrl) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: redirectUrl }],
                    });
                }
            }, timer * 1000);
        }
    };

    const hideNotification = () => {
        setNotification({ message: '', type: '', visible: false, redirectUrl: '', timer: 0 });
    };

    const value = {
        notification,
        showNotification,
        hideNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}
