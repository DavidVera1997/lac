import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  Text, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import { MonthCalendar } from '@quidone/react-native-calendars';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import 'dayjs/locale/es'

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

export default function Calendario({ darkTheme = false }) {
  // Estados para controlar la visibilidad del modal, el día seleccionado y los eventos
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentEvents, setCurrentEvents] = useState([]);
  
  // Animación para el modal (para efectos de entrada y salida)
  const modalAnim = useRef(new Animated.Value(0)).current;
  
  // Datos de ejemplo para eventos
  const events = {
    '2025-02-25': [
      { id: 1, title: 'Control médico', time: '09:00', type: 'medical' },
      { id: 2, title: 'Vacunación', time: '15:30', type: 'vaccine' }
    ],
    '2025-02-27': [
      { id: 3, title: 'Chequeo dental', time: '11:00', type: 'dental' },
    ],
  };

  // Función para manejar la selección de un día
  const handleDayPress = (day) => {
    setSelected(day.dateString); // Establece el día seleccionado
    setCurrentEvents(events[day.dateString] || []); // Establece los eventos para el día seleccionado
    showModal(); // Muestra el modal con los eventos
  };

  // Función para mostrar el modal con animación
  const showModal = () => {
    setModalVisible(true);
    Animated.spring(modalAnim, { // Efecto de animación con resorte
      toValue: 1,
      useNativeDriver: true,
      tension: 65,
      friction: 8
    }).start();
  };

  // Función para ocultar el modal con animación
  const hideModal = () => {
    Animated.timing(modalAnim, { // Efecto de animación de salida
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => setModalVisible(false)); // Cierra el modal cuando termina la animación
  };

  // Función que devuelve un ícono según el tipo de evento
  const getEventIcon = (type) => {
    switch (type) {
      case 'medical':
        return <MaterialIcons name="medical-services" size={24} color={darkTheme ? "#8015ad" : "#6a0dad"} />;
      case 'vaccine':
        return <MaterialIcons name="vaccines" size={24} color={darkTheme ? "#8015ad" : "#6a0dad"} />;
      case 'dental':
        return <MaterialIcons name="cleaning-services" size={24} color={darkTheme ? "#8015ad" : "#6a0dad"} />;
      default:
        return <MaterialIcons name="event" size={24} color={darkTheme ? "#8015ad" : "#6a0dad"} />;
    }
  };

  // Interpolación de la animación para el tamaño del modal
  const modalScale = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  });

  // Interpolación de la animación para la posición vertical del modal
  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  });

  return (
    <View style={[styles.container, darkTheme && styles.containerDark]}>
      <View
        style={[styles.gradientContainer, darkTheme ? styles.gradientDark : styles.gradientLight]}
      >

        {/* Componente de calendario */}
<MonthCalendar
  locale={'es'} // Establece el idioma del calendario en español
  firstDay={1} // Hace que la semana comience en lunes
  selectedDay={selected} // Día actualmente seleccionado
  onDayChanged={handleDayPress} // Llama a la función cuando se selecciona un día
  markedDays={[
    [Date.now(), { selected: true }], // Marca el día actual como seleccionado
    ['2025-02-25', '2025-02-27', { dots: [{ color: darkTheme ? '#8015ad' : '#6a0dad' }] }], // Marca los días con eventos usando puntos de colores
  ]}
  theme={{
    calendarPaddingHorizontal: 18, // Espaciado horizontal del calendario
    monthTitleColor: darkTheme ? '#ffffff' : '#000000', // Color del título del mes según el tema
    monthTitleFontSize: 20, // Tamaño de la fuente del título del mes
    weekDayTitleColor: darkTheme ? '#ffffff' : '#000000', // Color de los nombres de los días de la semana
    weekDayTitleFontSize: 14, // Tamaño de la fuente de los nombres de los días de la semana
    pagePaddingTop: 1, // Espaciado superior de la página del calendario
    pagePaddingBottom: 1, // Espaciado inferior de la página del calendario
    pageBetweenRows: 2, // Espaciado entre filas del calendario
    dayContainerSize: 30, // Tamaño del contenedor de cada día
    dayFontSize: 17, // Tamaño de la fuente de los números de los días
    dayBgColor: { 
      value: 'transparent', // Fondo transparente para los días
      type: 'spring', // Animación de tipo "spring" para cambios de estado
      option: { duration: 200 }, // Duración de la animación en milisegundos
    },
    daySelectedBgColor: { 
      value: darkTheme ? '#8015ad' : '#6a0dad', // Color de fondo del día seleccionado según el tema
      type: 'spring', 
      option: { duration: 200 }, 
    },
    dayColor: { 
      value: darkTheme ? '#ffffff' : '#000000', // Color del texto de los días según el tema
      type: 'spring', 
      option: { duration: 200 }, 
    },
    daySelectedColor: { 
      value: '#ffffff', // Color del texto del día seleccionado
      type: 'spring', 
      option: { duration: 200 }, 
    },
    daySecondaryOpacity: 0.5, // Opacidad para los días secundarios (mes anterior o siguiente)
    dayDisabledOpacity: 0.3, // Opacidad para los días deshabilitados
    dayDotSize: 6, // Tamaño del punto indicador de eventos
  }}
/>

        {/* Modal para mostrar eventos */}
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible} // Controla la visibilidad del modal
          onRequestClose={hideModal} // Cierra el modal cuando se presiona el área externa
        >
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={hideModal} // Cierra el modal cuando se toca el área oscurecida
          >
            {/* Vista del modal con animación */}
            <Animated.View 
              style={[
                styles.modalView,
                darkTheme && styles.modalViewDark,
                {
                  transform: [
                    { scale: modalScale }, // Aplica la animación de escala
                    { translateY: modalTranslateY } // Aplica la animación de desplazamiento vertical
                  ]
                }
              ]}
            >
              <View style={styles.modalHeader}>
                {/* Título del modal con la fecha seleccionada */}
                <Text style={[styles.modalTitle, darkTheme && styles.textDark]}>
                  {selected ? new Date(selected).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ''}
                </Text>
                {/* Botón de cerrar el modal */}
                <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={darkTheme ? "#fff" : "#000"} />
                </TouchableOpacity>
              </View>

              {/* Lista de eventos del día seleccionado */}
              <ScrollView style={styles.eventsList}>
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <View key={event.id} style={[styles.eventItem, darkTheme && styles.eventItemDark]}>
                      {/* Icono del evento basado en el tipo */}
                      {getEventIcon(event.type)}
                      <View style={styles.eventInfo}>
                        {/* Título del evento */}
                        <Text style={[styles.eventTitle, darkTheme && styles.textDark]}>
                          {event.title}
                        </Text>
                        {/* Hora del evento */}
                        <Text style={[styles.eventTime, darkTheme && styles.textDark]}>
                          {event.time}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.noEventsContainer}>
                    {/* Icono y mensaje cuando no hay eventos */}
                    <MaterialIcons 
                      name="event-busy" 
                      size={48} 
                      color={darkTheme ? "#8015ad" : "#6a0dad"} 
                    />
                    <Text style={[styles.noEventsText, darkTheme && styles.textDark]}>
                      No hay eventos para este día
                    </Text>
                  </View>
                )}
              </ScrollView>

              {/* Botón para agregar un nuevo evento */}
              <TouchableOpacity 
                style={[styles.addEventButton, darkTheme && styles.addEventButtonDark]}
                onPress={() => {}}
              >
                <MaterialIcons name="add" size={24} color="#fff" />
                <Text style={styles.addEventText}>Agregar Evento</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco por defecto
  },
  containerDark: {
    backgroundColor: '#000', // Fondo negro para el tema oscuro
  },
  gradientContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'linear-gradient(to bottom, #ffffff, #f8f8f8)', // Gradiente simple
  },
  gradientLight: {
    backgroundColor: '#ffffff', // Blanco para un tema claro
  },
  gradientDark: {
    backgroundColor: '#000', // Gris oscuro para un tema oscuro
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 1,
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  todayButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(106, 13, 173, 0.1)', // Fondo de botón "Hoy"
  },
  todayText: {
    color: '#6a0dad', // Color del texto "Hoy"
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.9, // Ancho del modal (90% del ancho de la pantalla)
    maxHeight: height * 0.7, // Altura máxima del modal (70% de la pantalla)
    backgroundColor: '#fff', // Fondo blanco para el modal
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000', // Sombra para el modal
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewDark: {
    backgroundColor: '#1a1a1a', // Fondo oscuro para el modal en tema oscuro
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  eventsList: {
    maxHeight: height * 0.4, // Máxima altura para la lista de eventos
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8', // Fondo claro para los eventos
    borderRadius: 12,
    marginBottom: 12,
  },
  eventItemDark: {
    backgroundColor: '#2a2a2a', // Fondo oscuro para los eventos en tema oscuro
  },
  eventInfo: {
    marginLeft: 16,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  noEventsText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6a0dad', // Fondo para el botón "Agregar evento"
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  addEventButtonDark: {
    backgroundColor: '#8015ad', // Fondo del botón "Agregar evento" en tema oscuro
  },
  addEventText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  textDark: {
    color: '#fff', // Color de texto en tema oscuro
  },
});


















{/* <Calendar
        style={[styles.calendar, darkTheme && styles.calendarDark]}
        onDayPress={handleDayPress}
        firstDay={1} // Iniciar el calendario en lunes
        markedDates={{
          '2025-01-10': { customStyles: { container: { backgroundColor: '#ffe4e1', borderRadius: 10 }, text: { color: 'black' } }, marked: true },
          '2025-02-10': { customStyles: { container: { backgroundColor: '#ffe4e1', borderRadius: 10 }, text: { color: 'black' } }, marked: true },
          '2025-01-15': { customStyles: { container: { backgroundColor: '#ffebef', borderRadius: 10 }, text: { color: 'black' } }, marked: true },
          '2025-02-15': { customStyles: { container: { backgroundColor: '#ffebef', borderRadius: 10 }, text: { color: 'black' } }, marked: true },
        }}
        theme={{
          calendarBackground: darkTheme ? '#000000' : '#fffff',
          textSectionTitleColor: darkTheme ? '#b6c1cd' : '#b6c1cd',
          selectedDayBackgroundColor: '#6a0dad',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#6a0dad',
          dayTextColor: darkTheme ? '#ffffff' : '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: darkTheme ? '#ffcccb' : 'orange',
          monthTextColor: darkTheme ? '#ffcccb' : '#6a0dad',
          indicatorColor: darkTheme ? '#ffcccb' : '#6a0dad',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 18,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
          'stylesheet.calendar.header': {
            arrow: {
              width: 24,
              height: 24,
            },
            monthText: {
              fontSize: 20,
              fontWeight: 'bold',
              color: darkTheme ? '#ffcccb' : '#6a0dad',
            },
            week: {
              marginTop: 0,
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          },
          'stylesheet.day.basic': {
            base: {
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: darkTheme ? '#444' : '#eee',
            },
            text: {
              marginTop: -10,
              fontSize: 18,
              color: darkTheme ? '#ffffff' : '#2d4150',
            },
          },
        }}
      /> */}
