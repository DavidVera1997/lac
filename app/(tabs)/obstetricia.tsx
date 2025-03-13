import React, { useState } from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  useColorScheme,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Íconos para el botón flotante
import EmbarazadaCard from '@/components/ui/EmbarazadaCard';
import EmbarazadaHeader from '@/components/ui/EmbarazadaHeader';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NuevoLactanteForm from '@/components/forms/NuevoLactanteForm';
import NuevaEmbarazadaForm from '@/components/forms/NuevaEmbarazadaForm';

export interface Embarazada {
  nombreCompleto: string;
  fechaNacimiento: string;
  peso: string;
  talla: string;
  dbps: string; // Nuevo campo para DBPS
  telefono: string; // Número de teléfono
  consultorio: string; // Consultorio
  edad: number;
  vacunas: string[];
  ultimoCtrl: string;
  proximoCtrl: string;
  grupoRiesgo: number;
  au: number;
}

// Ejemplo de datos de embarazadas
const embarazadas: Embarazada[] = [
  // {
  //   nombreCompleto: 'Laura Martínez López',
  //   fechaNacimiento: '1988-05-20',
  //   telefono: '+53 50123458',
  //   ultimoCtrl: '2025-01-05',
  //   proximoCtrl: '2025-02-05',
  //   consultorio: 'Consultorio 1',
  //   peso: '70kg',
  //   au: 0,
  //   dbps: '',
  //   edad: 50
  // },
  // {
  //   nombre: 'Ana',
  //   apellidos: 'Rodríguez García',
  //   fechaNacimiento: '1990-08-15',
  //   edadGestacional: '30 semanas',
  //   fechaUltimaMenstruacion: '2024-09-15',
  //   telefono: '+53 50123459',
  //   ultimoCtrl: '2025-01-10',
  //   proximoCtrl: '2025-02-10',
  //   consultorio: 'Consultorio 2',
  //   peso: '68kg',
  //   presionArterial: '118/76',
  //   alturaUterina: '30cm',
  //   fechaPartoProbable: '2025-05-20',
  //   observaciones: 'Recomendar más reposo.',
  // },
];
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



export default function ObstetriciaScreen(): JSX.Element {
  const [busqueda, setBusqueda] = useState<string>('');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado del modal
  const [embarazadas, setEmbarazadas] = useState<Embarazada[]>([]); // Lista de lactantes en estado
  let themeApp = useColorScheme()

  // Filtrado de embarazadas basado en la búsqueda
  const filtrarEmbarazadas: Embarazada[] = embarazadas.filter(
    (embarazada) =>
      embarazada.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para manejar el cambio de tema
  const toggleTheme = (): void => setDarkTheme(!darkTheme);

  // Función para manejar la navegación al formulario de agregar embarazada
  const handleAddEmbarazada = (): void => {
    setModalVisible(true) // Navegar a la pantalla "AddEmbarazada"
  };


  // Renderizador de cada tarjeta de embarazada
  const renderEmbarazada: ListRenderItem<Embarazada> = ({ item }): JSX.Element => (
    <EmbarazadaCard embarazada={item} darkTheme={themeApp === 'dark' ? true : false} />
  );



  // Función para guardar un nuevo lactante
  const handleSaveLactante = (nuevaEmbarazada: Embarazada): void => {
    setEmbarazadas((prevEmbarzadas) => [...prevEmbarzadas, nuevaEmbarazada]); // Agregar inmutablemente
  };
  return (
    <SafeAreaView style={[styles.container, themeApp === 'dark' && styles.containerDark]}>
      <ScrollView>
        {/* Header con la barra de búsqueda */}
        <EmbarazadaHeader
          setBusqueda={setBusqueda}
          darkTheme={darkTheme}
          toggleTheme={toggleTheme}
        />

        {/* Listado de embarazadas */}
        {embarazadas.length === 0 ? (
          <Text style={themeApp === 'dark' ? styles.messageDark : styles.message}>No existen embarazadas...</Text>
        ) : <FlatList
          data={filtrarEmbarazadas}
          keyExtractor={(item) => item.nombreCompleto}
          renderItem={renderEmbarazada}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />}

      </ScrollView>

      {/* Botón flotante para agregar embarazadas */}
      <TouchableOpacity style={styles.fab} onPress={handleAddEmbarazada}>
        <Icon name="add" size={24} color={themeApp === 'dark' ? '#000' : '#fff'} />
      </TouchableOpacity>
      {/* Formulario para agregar lactantes */}
      <NuevaEmbarazadaForm
        modalVisible={modalVisible}
        setModalVisible={(visible: boolean) => setModalVisible(visible)}
        onSave={handleSaveLactante}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#000',
  },
  list: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 50, // Movido un poco más arriba
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6a0dad', // Color acorde al diseño
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
