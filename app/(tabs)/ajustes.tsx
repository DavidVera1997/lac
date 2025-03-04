import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';


// Definición del componente principal
const SettingsScreen: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(true);

    // Función para abrir un enlace de Telegram
    const openTelegram = (): void => {
        Linking.openURL('https://t.me/DavidV97'); // Reemplaza con el enlace a tu canal o usuario de Telegram
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Ajustes</Text>

            {/* Configuración de modo oscuro */}
            <View style={styles.settingRow}>
                <Text style={styles.label}>Modo oscuro</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={(value: boolean) => setIsDarkMode(value)}
                />
            </View>

            {/* Configuración de notificaciones */}
            <View style={styles.settingRow}>
                <Text style={styles.label}>Notificaciones</Text>
                <Switch
                    value={isNotificationsEnabled}
                    onValueChange={(value: boolean) => setIsNotificationsEnabled(value)}
                />
            </View>

            {/* Información adicional */}
            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Información de la App</Text>
                <Text style={styles.infoText}>Desarrollador: Juan Pérez</Text>
                <Text style={styles.infoText}>Versión: 1.0.0</Text>
                <Text style={styles.infoText}>Última actualización: 01 de marzo de 2025</Text>
            </View>

            {/* Enlaces de contacto */}
            <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>Contáctanos</Text>
                <TouchableOpacity style={styles.contactLink} onPress={openTelegram}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
                        color='#517fa4'
                        size={25} //TAMANO DEL ICONOOOOOOOOO
                    />
                    <Text style={styles.contactText}> Telegram</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
    },
    infoSection: {
        marginTop: 40,
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    contactSection: {
        marginTop: 40,
        alignItems: 'flex-start',
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contactLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 16,
        color: '#0088cc',
        marginLeft: 5,
    },
});

export default SettingsScreen;
