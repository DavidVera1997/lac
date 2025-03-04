import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendario from '@/components/ui/Calendario';
import Header from '@/components/ui/Header';
import Notificaciones from '@/components/ui/Notificaciones';

interface Lactante {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  peso: string;
  talla: string;
  cc: string;
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

const lactantes: Lactante[] = [
  {
    nombre: 'Valentina',
    apellidos: 'González Pérez',
    fechaNacimiento: '2021-11-15',
    peso: '5.2kg',
    talla: '58cm',
    cc: '39cm',
    edad: '3m',
    percentilPesoTalla: 50,
    percentilTallaEdad: 60,
    percentilPesoEdad: 50,
    vacunas: 80,
    telefono: '+53 50123456',
    ultimoCtrl: '2025-01-10',
    proximoCtrl: '2025-02-10',
    genero: 'femenino',
    consultorio: 'Consultorio 1',
    grupoRiesgo: 2,
    tipoAlimentacion: 'Lactancia materna exclusiva',
    familiaFuncional: 'Funcional',
  },
  {
    nombre: 'Matías',
    apellidos: 'Fernández Gómez',
    fechaNacimiento: '2021-10-10',
    peso: '6.0kg',
    talla: '60cm',
    cc: '40cm',
    edad: '4m',
    percentilPesoTalla: 75,
    percentilTallaEdad: 80,
    percentilPesoEdad: 75,
    vacunas: 60,
    telefono: '+53 50123457',
    ultimoCtrl: '2025-01-15',
    proximoCtrl: '2025-02-15',
    genero: 'masculino',
    consultorio: 'Consultorio 2',
    grupoRiesgo: 3,
    tipoAlimentacion: 'Lactancia materna y fórmula',
    familiaFuncional: 'No funcional',
  },
];

export default function HomeScreen(): JSX.Element {
  const [busqueda, setBusqueda] = useState<string>('');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, darkTheme && styles.containerDark]}>
        <Header setBusqueda={setBusqueda} darkTheme={darkTheme} toggleTheme={toggleTheme} />
        <ScrollView style={{ flex: 1 }}>
          <Notificaciones />
          <Calendario darkTheme={darkTheme} />
        </ScrollView>
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
    flex: 1,
  },
});
