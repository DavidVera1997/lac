import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Define la interfaz para una tarea
interface Task {
  id: string;
  texto: string;
  tipo: 'usuario' | 'documento' | 'llamada' | string;
}

export default function Notificaciones(): JSX.Element {
  // Estado para almacenar las tareas pendientes
  const [tareasPendientes, setTareasPendientes] = useState<Task[]>([
    { id: '1', texto: 'Actualizar datos de Valentina', tipo: 'usuario' },
    { id: '2', texto: 'Revisar control de Matías', tipo: 'documento' },
    { id: '3', texto: 'Llamar a los padres de Sofía', tipo: 'llamada' },
    { id: '4', texto: 'Actualizar datos de Valentina', tipo: 'usuario' },
    { id: '5', texto: 'Revisar control de Matías', tipo: 'documento' },
    { id: '6', texto: 'Llamar a los padres de Sofía', tipo: 'llamada' },
  ]);

  // Estado para almacenar el número de tareas completadas
  const [tareasCompletadas, setTareasCompletadas] = useState<number>(0);

  // Estado para manejar el modo expandido (no se está usando en este ejemplo, pero se deja para futuras mejoras)
  const [expandido, setExpandido] = useState<boolean>(true);

  // Animaciones
  const slideAnim = new Animated.Value(1); // Valor de escala/altura
  const rotateAnim = new Animated.Value(0); // Valor para la rotación de la flecha
  const progressAnim = new Animated.Value(0); // Valor para el progreso de las tareas

  // Se crea una animación por cada tarea pendiente
  const taskAnims: Animated.Value[] = tareasPendientes.map(() => new Animated.Value(0));

  // Función para determinar el ícono según el tipo de tarea
  const getIconoPorTipo = (tipo: string): string => {
    switch (tipo) {
      case 'usuario':
        return 'user';
      case 'documento':
        return 'file-text-o';
      case 'llamada':
        return 'phone';
      default:
        return 'bell';
    }
  };

  // Efecto para actualizar el progreso y animar las tareas al montarse o actualizarse los estados
  useEffect(() => {
    const porcentaje: number =
      (tareasCompletadas / (tareasPendientes.length + tareasCompletadas)) * 100;
    Animated.timing(progressAnim, {
      toValue: porcentaje,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    tareasPendientes.forEach((_, index) => {
      Animated.sequence([
        Animated.delay(index * 150),
        Animated.spring(taskAnims[index], {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [tareasPendientes, tareasCompletadas, progressAnim, taskAnims]);

  // Callback para eliminar una tarea y marcarla como completada
  const eliminarTarea = useCallback((tareaId: string): void => {
    setTareasPendientes((current) => current.filter((tarea) => tarea.id !== tareaId));
    setTareasCompletadas((prev) => prev + 1);
  }, []);

  // Interpolaciones de animación
  const alturaCard = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 280],
  });

  const rotacionFlecha = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={styles.contenedor}>
      <View style={styles.gradiente}>
        <TouchableOpacity style={styles.header}>
          <View style={styles.headerIzquierda}>
            <Animated.View style={[styles.contenedorCampana, { transform: [{ scale: slideAnim }] }]}>
              <FontAwesome name="bell" size={16} color="#fff" />
            </Animated.View>
            <Text style={styles.titulo}>Notificaciones</Text>
            {tareasPendientes.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.textoBadge}>{tareasPendientes.length}</Text>
              </View>
            )}
          </View>
          {/*
            Para agregar el ícono de flecha, descomenta lo siguiente:
            <Animated.View style={{ transform: [{ rotate: rotacionFlecha }] }}>
              <FontAwesome name="chevron-down" size={20} color="#fff" />
            </Animated.View>
          */}
        </TouchableOpacity>

        <Animated.View style={[styles.contenido, { opacity: slideAnim }]}>
          <View style={styles.listaTareas}>
            {tareasPendientes.map((tarea, index) => (
              <Animated.View
                key={tarea.id}
                style={[
                  styles.itemTarea,
                  {
                    transform: [
                      { scale: taskAnims[index] },
                      {
                        translateX: taskAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, 0],
                        }),
                      },
                    ],
                    opacity: taskAnims[index],
                  },
                ]}
              >
                <View style={styles.contenidoTarea}>
                  <FontAwesome
                    name={getIconoPorTipo(tarea.tipo)}
                    size={14}
                    color="#fff"
                    style={styles.iconoTarea}
                  />
                  <Text style={styles.textoTarea}>{tarea.texto}</Text>
                </View>
                <TouchableOpacity onPress={() => eliminarTarea(tarea.id)} style={styles.botonEliminar}>
                  <FontAwesome name="check" size={12} color="#fff" />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          <View style={styles.contenedorProgreso}>
            <View style={styles.fondoProgreso}>
              <Animated.View
                style={[
                  styles.rellenoProgreso,
                  { transform: [{ rotateZ: progressInterpolate }] },
                ]}
              />
            </View>
            <View style={styles.centroProgreso}>
              <Text style={styles.textoProgreso}>
                {((tareasCompletadas / (tareasPendientes.length + tareasCompletadas)) * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    margin: 10,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradiente: {
    flex: 1,
    padding: 16,
    backgroundColor: '#6a0dad',
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIzquierda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contenedorCampana: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  textoBadge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contenido: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },
  listaTareas: {
    flex: 1,
    marginRight: 16,
  },
  itemTarea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  contenidoTarea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconoTarea: {
    marginRight: 8,
  },
  textoTarea: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  botonEliminar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorProgreso: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fondoProgreso: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rellenoProgreso: {
    position: 'absolute',
    width: 90,
    height: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#fff',
    transform: [{ translateX: 20 }],
  },
  textoProgreso: {
    color: '#6a0dad',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  centroProgreso: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});



