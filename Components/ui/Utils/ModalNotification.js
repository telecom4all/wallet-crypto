import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNotification } from "../../../Context/NotificationContext";

function ModalNotification() {
    const { notification, hideNotification } = useNotification();

    const handleClose = () => {
        hideNotification();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={notification.visible}
            onRequestClose={handleClose}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modal, styles[notification.type]]}>
                    <Text style={styles.message}>{notification.message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    visible: {
        opacity: 1,
        zIndex: 1000, // Ajustez en fonction de votre application
    },
    message: {
        marginBottom: 20,
        color: 'white',
    },
    closeButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: 'white',
    },
    success: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
    error: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
    warning: {
        backgroundColor: 'orange',
        borderColor: 'orange',
    },
    info: {
        backgroundColor: 'blue',
        borderColor: 'blue',
    },
});

export default ModalNotification;
