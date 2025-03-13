import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPediatria from '@/components/ui/HeaderPediatria';
import LactanteCard from '@/components/ui/LactanteCard';
import MedicationCalculator from '@/components/ui/MedicationCalculator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NuevoLactanteForm from '@/components/forms/NuevoLactanteForm';
import { useColorScheme } from 'react-native';

// Define la interfaz para los datos de un lactante
interface Lactante {
    nombreCompleto: string; // Se usa un solo campo en lugar de nombre y apellidos
    fechaNacimiento: string;
    peso: string;
    talla: string;
    cc: string; // Circunferencia cefálica
    edad: string;
    percentilPesoTalla: number;
    percentilTallaEdad: number;
    percentilPesoEdad: number;
    vacunas: string[];
    telefono: string;
    ultimoCtrl: string;
    proximoCtrl: string;
    sexo: string;
    consultorio: string;
    grupoRiesgo: number;
    tipoAlimentacion: string;
    familiaFuncional: string;
}

export default function HomeScreen(): JSX.Element {
    const [busqueda, setBusqueda] = useState<string>(''); // Estado de búsqueda
    const [darkTheme, setDarkTheme] = useState<boolean>(false); // Tema oscuro
    const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado del modal
    const [lactantes, setLactantes] = useState<Lactante[]>([]); // Lista de lactantes en estado
    let themeApp = useColorScheme()

    // Función para guardar un nuevo lactante
    const handleSaveLactante = (nuevoLactante: Lactante): void => {
        setLactantes((prevLactantes) => [...prevLactantes, nuevoLactante]); // Agregar inmutablemente
    };

    // Renderiza un LactanteCard
    const renderLactante = ({ item }: { item: Lactante }): JSX.Element => (
        <LactanteCard lactante={item} darkTheme={themeApp === 'dark' ? true : false} />
    );

    const toggleTheme = () => setDarkTheme(!darkTheme);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[themeApp === 'dark' ? styles.containerDark : styles.container,]}>
                {/* Header del componente */}
                <HeaderPediatria setBusqueda={setBusqueda} darkTheme={themeApp === 'dark' ? true : false} toggleTheme={toggleTheme} />

                {/* Lista de lactantes */}
                <View style={{ flex: 1 }}>
                    {lactantes.length === 0 ? (
                        <Text style={themeApp === 'dark' ? styles.messageDark : styles.message}>No existen lactantes...</Text>
                    ) : <FlatList
                        data={lactantes.filter((lactante) =>
                            (lactante.nombreCompleto?.toLowerCase() || '').includes(busqueda.toLowerCase()) // Usa nombreCompleto
                        )}
                        keyExtractor={(item, index) => `${item.nombreCompleto}-${index}`} // Clave única más confiable
                        renderItem={renderLactante}
                        contentContainerStyle={styles.lactantesList}
                    />}

                    <MedicationCalculator />
                </View>

                {/* Botón flotante para agregar un nuevo lactante */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="add" size={24} color={themeApp === 'dark' ? '#000' : '#fff'} />
                </TouchableOpacity>

                {/* Formulario para agregar lactantes */}
                <NuevoLactanteForm
                    modalVisible={modalVisible}
                    setModalVisible={(visible: boolean) => setModalVisible(visible)}
                    onSave={handleSaveLactante}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#000',
        flex: 1
    },
    lactantesList: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#6a0dad',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabIcon: {
        color: '#fff',
    },
    messageDark: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 25,
        color: '#64748b',
    },
    message: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 25,
        color: '#64748b',
    },
});


