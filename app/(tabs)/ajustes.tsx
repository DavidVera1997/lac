import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet, TouchableOpacity, Linking, useColorScheme } from 'react-native';
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
    let themeApp = useColorScheme()
    return (
        <SafeAreaView style={themeApp === 'dark' ? styles.containerDark : styles.container}>
            <Text style={themeApp === 'dark' ? styles.titledark : styles.title}>Ajustes</Text>

            {/* Configuración de modo oscuro */}
            <View style={themeApp === 'dark' ? styles.settingRowDark : styles.settingRow}>
                <Text style={themeApp === 'dark' ? styles.labelDark : styles.label}>Modo oscuro</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={(value: boolean) => setIsDarkMode(value)}
                />
            </View>

            {/* Configuración de notificaciones */}
            <View style={themeApp === 'dark' ? styles.settingRowDark : styles.settingRow}>
                <Text style={themeApp === 'dark' ? styles.labelDark : styles.label}>Notificaciones</Text>
                <Switch
                    value={isNotificationsEnabled}
                    onValueChange={(value: boolean) => setIsNotificationsEnabled(value)}
                />
            </View>

            {/* Información adicional */}
            <View style={themeApp === 'dark' ? styles.infoSectionDark : styles.infoSection}>
                <Text style={themeApp === 'dark' ? styles.infoTitleDark : styles.infoTitle}>Información de la App</Text>
                <Text style={themeApp === 'dark' ? styles.infoTextDark : styles.infoText}>Desarrollador: Juan Pérez</Text>
                <Text style={themeApp === 'dark' ? styles.infoTextDark : styles.infoText}>Versión: 1.0.0</Text>
                <Text style={themeApp === 'dark' ? styles.infoTextDark : styles.infoText}>Última actualización: 01 de marzo de 2025</Text>
            </View>

            {/* Enlaces de contacto */}
            <View style={themeApp === 'dark' ? styles.contactSectionDark : styles.contactSection}>
                <Text style={themeApp === 'dark' ? styles.contactTitleDark : styles.contactTitle}>Contáctanos</Text>
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
    containerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    titledark: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    settingRowDark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        color: '#fff'
    },
    label: {
        fontSize: 18,
    },
    labelDark: {
        fontSize: 18,
        color: '#fff'
    },
    infoSection: {
        marginTop: 40,
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    infoSectionDark: {
        marginTop: 40,
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#000'
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoTitleDark: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff'
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    infoTextDark: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    contactSection: {
        marginTop: 40,
        alignItems: 'flex-start',
    },
    contactSectionDark: {
        marginTop: 40,
        alignItems: 'flex-start',
        color: '#fff'
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contactTitleDark: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff'
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
