import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function LactanteCard({ lactante, darkTheme }) {
  const [isExpanded, setIsExpanded] = useState(false); // Estado de expansión
  const [scaleValue] = useState(new Animated.Value(1)); // Animación de escalado

  // Animaciones de toque
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

  // Control de expansión del componente
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Color del borde según el sexo
  const getBorderColor = () => {
    if (lactante.sexo === 'femenino') return '#FF69B4'; // Rosa
    if (lactante.sexo === 'masculino') return '#ADD8E6'; // Azul
    return '#ddd'; // Color por defecto
  };

  // Estilo dinámico de la tarjeta
  const cardStyle = {
    transform: [{ scale: scaleValue }],
    borderColor: getBorderColor(),
    borderWidth: 2,
  };

  return (
    <Animated.View style={[styles.card, darkTheme && styles.cardDark, cardStyle]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleToggleExpand}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={[styles.nombre, darkTheme && styles.nombreDark]}>
            {lactante.nombreCompleto || 'Nombre no disponible'}
          </Text>
          <Text style={[styles.consultorio, darkTheme && styles.consultorioDark]}>
            {lactante.consultorio ? `Consultorio ${lactante.consultorio}` : 'Consultorio'}
          </Text>
        </View>
        {/* Detalles principales */}
        <View style={styles.row}>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            Edad: {lactante.edad} (F.N: {lactante.fechaNacimiento})
          </Text>
          <Text style={[styles.text, darkTheme && styles.textDark]}>Tel: {lactante.telefono}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            {'\u25CF'} Último control: {lactante.ultimoCtrl}
          </Text>
          <Text style={[styles.text, darkTheme && styles.textDark]}>
            {'\u25CB'} Próximo control: {lactante.proximoCtrl}
          </Text>
        </View>
        <Text style={[styles.text, darkTheme && styles.textDark, styles.valoracionNutricional]}>
          VN: {lactante.percentilPesoTalla}
        </Text>

        {/* Detalles expandidos */}
        {isExpanded && (
          <>
            <Text style={[styles.text, darkTheme && styles.textDark]}>
              Vacunas: {lactante.vacunas}%
            </Text>
            <View style={styles.row}>
              <Text style={[styles.text, darkTheme && styles.textDark]}>P: {lactante.peso}</Text>
              <Text style={[styles.text, darkTheme && styles.textDark]}>
                P/T: {lactante.percentilPesoTalla}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, darkTheme && styles.textDark]}>T: {lactante.talla}</Text>
              <Text style={[styles.text, darkTheme && styles.textDark]}>
                T/E: {lactante.percentilTallaEdad}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text, darkTheme && styles.textDark]}>CC: {lactante.cc}</Text>
              <Text style={[styles.text, darkTheme && styles.textDark]}>
                P/E: {lactante.percentilPesoEdad}
              </Text>
            </View>
            <Text style={[styles.text, darkTheme && styles.textDark]}>
              Alimentación: {lactante.tipoAlimentacion}
            </Text>
            <Text style={[styles.text, darkTheme && styles.textDark]}>
              DBPS: Lactante Grupo de riesgo {lactante.grupoRiesgo}, {lactante.tipoAlimentacion},{' '}
              {lactante.familiaFuncional}
            </Text>
            <TouchableOpacity style={[styles.button, darkTheme && styles.buttonDark]}>
              <Text style={styles.buttonText}>Realizar control</Text>
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// Estilos
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  },
  valoracionNutricional: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
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











