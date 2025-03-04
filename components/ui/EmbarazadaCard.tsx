import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Embarazada {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  edadGestacional: string;
  fechaUltimaMenstruacion: string;
  telefono: string;
  ultimoCtrl: string;
  proximoCtrl: string;
  consultorio: string;
  // Datos adicionales que son relevantes en el control obstétrico
  peso?: string;                // Peso actual
  presionArterial?: string;      // Presión arterial
  alturaUterina?: string;        // Altura uterina
  fechaPartoProbable?: string;   // Fecha probable de parto
  observaciones?: string;        // Observaciones del examen
}

interface EmbarazadaCardProps {
  embarazada: Embarazada;
  darkTheme: boolean;
}

export default function EmbarazadaCard({ embarazada, darkTheme }: EmbarazadaCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [scaleValue] = useState<Animated.Value>(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Estilo de la tarjeta (podés adaptarlo según alguna lógica)
  const cardStyle = {
    transform: [{ scale: scaleValue }],
    borderColor: '#6a0dad',
    borderWidth: 2,
  };

  return (
    <Animated.View style={[styles.card, darkTheme && styles.cardDark, cardStyle]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleToggleExpand}
      >
        <View style={styles.header}>
          <Text style={[styles.nombre, darkTheme && styles.nombreDark]}>
            {embarazada.nombre} {embarazada.apellidos}
          </Text>
          <Text style={[styles.consultorio, darkTheme && styles.consultorioDark]}>
            {embarazada.consultorio}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            Edad gest.: {embarazada.edadGestacional}
          </Text>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            Tel: {embarazada.telefono}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            F.N.: {embarazada.fechaNacimiento}
          </Text>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            FUM: {embarazada.fechaUltimaMenstruacion}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            Ctrl: {embarazada.ultimoCtrl} - {embarazada.proximoCtrl}
          </Text>
        </View>
        {isExpanded && (
          <>
            {embarazada.peso && (
              <View style={styles.row}>
                <Text style={[styles.text, darkTheme && styles.textDark]}>
                  Peso: {embarazada.peso}
                </Text>
              </View>
            )}
            {embarazada.presionArterial && (
              <View style={styles.row}>
                <Text style={[styles.text, darkTheme && styles.textDark]}>
                  PA: {embarazada.presionArterial}
                </Text>
              </View>
            )}
            {embarazada.alturaUterina && (
              <View style={styles.row}>
                <Text style={[styles.text, darkTheme && styles.textDark]}>
                  Alt. uterina: {embarazada.alturaUterina}
                </Text>
              </View>
            )}
            {embarazada.fechaPartoProbable && (
              <View style={styles.row}>
                <Text style={[styles.text, darkTheme && styles.textDark]}>
                  FPP: {embarazada.fechaPartoProbable}
                </Text>
              </View>
            )}
            {embarazada.observaciones && (
              <View style={styles.row}>
                <Text style={[styles.text, darkTheme && styles.textDark]}>
                  Obs: {embarazada.observaciones}
                </Text>
              </View>
            )}
            <TouchableOpacity style={[styles.button, darkTheme && styles.buttonDark]}>
              <Text style={styles.buttonText}>Realizar control</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: '#333',
    shadowColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  nombreDark: {
    color: '#ffcccb',
  },
  consultorio: {
    fontSize: 12,
    color: '#6a0dad',
  },
  consultorioDark: {
    color: '#ffcccb',
  },
  text: {
    fontSize: 14,
    color: '#2d4150',
    marginBottom: 2,
  },
  textDark: {
    color: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#6a0dad',
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#ffcccb',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

