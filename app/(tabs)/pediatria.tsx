import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/ui/Header';
import LactanteCard from '@/components/ui/LactanteCard';
import MedicationCalculator from '@/components/ui/MedicationCalculator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NuevoLactanteForm from '@/components/forms/NuevoLactanteForm';

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
    vacunas: number;
    telefono: string;
    ultimoCtrl: string;
    proximoCtrl: string;
    genero: string;
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

    // Función para guardar un nuevo lactante
    const handleSaveLactante = (nuevoLactante: Lactante): void => {
        setLactantes((prevLactantes) => [...prevLactantes, nuevoLactante]); // Agregar inmutablemente
    };

    // Renderiza un LactanteCard
    const renderLactante = ({ item }: { item: Lactante }): JSX.Element => (
        <LactanteCard lactante={item} darkTheme={darkTheme} />
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[styles.container, darkTheme && styles.containerDark]}>
                {/* Header del componente */}
                <Header setBusqueda={setBusqueda} darkTheme={darkTheme} />

                {/* Lista de lactantes */}
                <ScrollView style={{ flex: 1 }}>
                    <FlatList
                        data={lactantes.filter((lactante) =>
                            (lactante.nombreCompleto?.toLowerCase() || '').includes(busqueda.toLowerCase()) // Usa nombreCompleto
                        )}
                        keyExtractor={(item, index) => `${item.nombreCompleto}-${index}`} // Clave única más confiable
                        renderItem={renderLactante}
                        contentContainerStyle={styles.lactantesList}
                    />
                    <MedicationCalculator />
                </ScrollView>

                {/* Botón flotante para agregar un nuevo lactante */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="add" size={24} color={darkTheme ? '#000' : '#fff'} />
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
        backgroundColor: '#f8f9fa',
    },
    containerDark: {
        backgroundColor: '#000',
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
});



export default HomeScreen;

