import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Appearance,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendario from '@/components/ui/Calendario';
import Header from '@/components/ui/Header';
import Notificaciones from '@/components/ui/Notificaciones';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer, DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



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
  let themeApp = useColorScheme()
  const [darkTheme, setDarkTheme] = useState(themeApp);
  console.log(darkTheme);

  const toggleTheme = () => setDarkTheme(themeApp == 'dark' ? 'light' : 'dark');
  console.log(themeApp);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;


  const handleThemeToggle = useCallback(() => {
    Vibration.vibrate(50);
    // Usamos _value de rotateAnim para determinar el estado actual. Tenga en cuenta que esto es una solución práctica.
    Animated.timing(rotateAnim, {
      toValue: (rotateAnim as any)._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    toggleTheme();
    Appearance.setColorScheme(themeApp == 'dark' ? 'light' : 'dark')
  }, [rotateAnim, themeApp]);


  if (themeApp === 'dark') {
    // render some dark thing
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={[styles.containerDark]}>
          {/* Boton de tema */}
          <View style={[styles.themeButtonContainer, styles.topRight]}>
            <Animated.View
              style={[
                styles.themeButton,
                themeApp == 'dark' && styles.themeButtonDark,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity onPress={handleThemeToggle}>
                <Ionicons name={'sunny'} size={24} color={'#fff'} />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Header setBusqueda={setBusqueda} darkTheme={true} toggleTheme={toggleTheme} />
          <ScrollView style={{ flex: 1 }}>
            <Notificaciones />
            <Calendario darkTheme={true} />
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  } else {
    // render some light thing
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={[styles.container]}>
          <View style={[styles.themeButtonContainer, styles.topRight]}>
            <Animated.View
              style={[
                styles.themeButton,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity onPress={handleThemeToggle}>
                <Ionicons name={'moon'} size={24} color={'#000'} />
              </TouchableOpacity>
            </Animated.View>
          </View>
          <Header setBusqueda={setBusqueda} darkTheme={false} toggleTheme={toggleTheme} />
          <ScrollView style={{ flex: 1 }}>
            <Notificaciones />
            <Calendario darkTheme={false} />
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    height: '100%'
  },
  containerDark: {
    backgroundColor: '#000',
    // flex: 1,
    height: '100%'
  },
  themeButtonContainer: {
    flex: 1,
    position: 'static',
    top: Platform.OS === 'ios' ? 15 : 5,
    right: 20,
    zIndex: 1
  },
  topRight: {
    width: 55,
    height: 100,
    // backgroundColor: 'purple', // Puedes cambiar el color a tu gusto
    position: 'absolute',
    top: 50,
    right: 0,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  themeButtonDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowOpacity: 0.15,
  },
});
