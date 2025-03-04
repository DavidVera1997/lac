import React, { useState } from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Íconos para el botón flotante
import EmbarazadaCard from '@/components/ui/EmbarazadaCard';
import EmbarazadaHeader from '@/components/ui/EmbarazadaHeader';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Embarazada {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  edadGestacional: string;
  fechaUltimaMenstruacion: string;
  telefono: string;
  ultimoCtrl: string;
  proximoCtrl: string;
  consultorio: string;
  peso?: string;
  presionArterial?: string;
  alturaUterina?: string;
  fechaPartoProbable?: string;
  observaciones?: string;
}

// Ejemplo de datos de embarazadas
const embarazadas: Embarazada[] = [
  {
    nombre: 'Laura',
    apellidos: 'Martínez López',
    fechaNacimiento: '1988-05-20',
    edadGestacional: '24 semanas',
    fechaUltimaMenstruacion: '2024-10-01',
    telefono: '+53 50123458',
    ultimoCtrl: '2025-01-05',
    proximoCtrl: '2025-02-05',
    consultorio: 'Consultorio 1',
    peso: '70kg',
    presionArterial: '120/80',
    alturaUterina: '24cm',
    fechaPartoProbable: '2025-06-15',
    observaciones: 'No hay complicaciones.',
  },
  {
    nombre: 'Ana',
    apellidos: 'Rodríguez García',
    fechaNacimiento: '1990-08-15',
    edadGestacional: '30 semanas',
    fechaUltimaMenstruacion: '2024-09-15',
    telefono: '+53 50123459',
    ultimoCtrl: '2025-01-10',
    proximoCtrl: '2025-02-10',
    consultorio: 'Consultorio 2',
    peso: '68kg',
    presionArterial: '118/76',
    alturaUterina: '30cm',
    fechaPartoProbable: '2025-05-20',
    observaciones: 'Recomendar más reposo.',
  },
];

export default function ObstetriciaScreen(): JSX.Element {
  const [busqueda, setBusqueda] = useState<string>('');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const navigation = useNavigation();

  // Filtrado de embarazadas basado en la búsqueda
  const filtrarEmbarazadas: Embarazada[] = embarazadas.filter(
    (embarazada) =>
      embarazada.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      embarazada.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para manejar el cambio de tema
  const toggleTheme = (): void => setDarkTheme(!darkTheme);

  // Función para manejar la navegación al formulario de agregar embarazada
  const handleAddEmbarazada = (): void => {
    navigation.navigate('AddEmbarazada'); // Navegar a la pantalla "AddEmbarazada"
  };

  // Renderizador de cada tarjeta de embarazada
  const renderEmbarazada: ListRenderItem<Embarazada> = ({ item }): JSX.Element => (
    <EmbarazadaCard embarazada={item} darkTheme={darkTheme} />
  );

  return (
    <SafeAreaView style={[styles.container, darkTheme && styles.containerDark]}>
      <ScrollView>
        {/* Header con la barra de búsqueda */}
        <EmbarazadaHeader
          setBusqueda={setBusqueda}
          darkTheme={darkTheme}
          toggleTheme={toggleTheme}
        />

        {/* Listado de embarazadas */}
        <FlatList
          data={filtrarEmbarazadas}
          keyExtractor={(item) => item.nombre + item.apellidos}
          renderItem={renderEmbarazada}
          contentContainerStyle={styles.list}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Botón flotante para agregar embarazadas */}
      <TouchableOpacity style={styles.fab} onPress={handleAddEmbarazada}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
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
});
