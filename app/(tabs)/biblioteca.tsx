import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, Animated, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Pdf from 'react-native-pdf';
import Libro from '../Libro';

// Definición de la interfaz para los libros
interface Libro {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  imagenUrl: any; // Ruta local de la imagen
  pdf: string;
}

// Categorías disponibles
const categorias: string[] = [
  "Todos",
  "Pediatría",
  "Obstetricia",
  "Medicina Interna",
  "Cirugía",
  "Dermatología",
  "Cardiología"
];

// Datos de los libros con imágenes locales
const libros: Libro[] = [
  {
    id: '1',
    titulo: 'Manual de Pediatría',
    autor: 'Dr. Juan Pérez',
    categoria: 'Pediatría',
    imagenUrl: require('../../assets/img/libro1.jpg'),
    pdf: '../assets/pdfs/libro1.pdf'
  },
  {
    id: '2',
    titulo: 'Guía de Obstetricia',
    autor: 'Dra. María López',
    categoria: 'Obstetricia',
    imagenUrl: require('../../assets/img/libro2.jpg'),
    pdf: '../assets/pdfs/libro2.pdf'
  },
];

// Componente principal
export default function Biblioteca() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Función para manejar la apertura del PDF
  const handleBookPress = (pdf: string) => {
    return (
      <Libro />
    )
    // Aquí puedes usar una librería como react-native-pdf o expo-web-browser para abrir el PDF
  };

  // Filtrar libros según la categoría seleccionada y la búsqueda
  const filteredBooks = selectedCategory === "Todos"
    ? libros.filter(libro => libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()))
    : libros.filter(libro => libro.categoria === selectedCategory && libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()));

  // Animaciones para la barra de búsqueda
  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(searchScale, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    if (!searchQuery) {
      setIsFocused(false);
      Animated.parallel([
        Animated.timing(searchScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {/* Header */}
          <View style={styles.headerContainer}>
            {/* Título animado */}
            <Animated.Text style={[styles.headerTitle, { opacity: fadeAnim }]}>
              Biblioteca Médica
            </Animated.Text>
            {/* Texto de ayuda */}
            <Animated.Text style={[styles.searchTip, { opacity: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>
              Escribe el título del libro...
            </Animated.Text>
            {/* Barra de búsqueda */}
            <Animated.View style={[styles.searchContainer, { transform: [{ scale: searchScale }] }]}>
              <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar libros..."
                placeholderTextColor="#64748b"
                value={searchQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={text => setSearchQuery(text)}
              />
              {searchQuery !== '' && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                  <Ionicons name="close" size={20} color="#64748b" />
                </TouchableOpacity>
              )}
            </Animated.View>
          </View>

          {/* Categorías */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            {categorias.map(categoria => (
              <TouchableOpacity
                key={categoria}
                onPress={() => setSelectedCategory(categoria)}
                style={[
                  styles.categoryButton,
                  selectedCategory === categoria && styles.categoryButtonActive
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === categoria && styles.categoryButtonTextActive
                  ]}
                >
                  {categoria}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Lista de libros */}
          <FlatList
            data={filteredBooks}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleBookPress(item.pdf)}
                activeOpacity={0.9}
                style={styles.bookCard}
              >
                <Image source={item.imagenUrl} style={styles.bookCover} />
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{item.titulo}</Text>
                  <Text style={styles.bookAuthor}>{item.autor}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.categoria}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="sentiment-dissatisfied" size={40} color="#94a3b8" />
                <Text style={styles.emptyText}>No se encontraron libros</Text>
              </View>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

// Estilos
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 80) / 2; // Reducción del tamaño de las tarjetas

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc', // Fondo claro
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 70 : StatusBar.currentHeight || 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#f8fafc', // Fondo claro
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a0dad', // Color igual al de "Pediatría"
    marginBottom: 10,
    textAlign: 'center',
  },
  searchTip: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  clearButton: {
    padding: 5,
  },
  categoriesScrollContent: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(106, 13, 173, 0.1)', // Color claro basado en #6a0dad
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#6a0dad', // Color activo
  },
  categoryButtonText: {
    color: '#6a0dad', // Color de texto
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff', // Texto blanco cuando está activo
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
  },
  bookCard: {
    width: CARD_WIDTH,
    marginVertical: 15,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookCover: {
    height: CARD_WIDTH * 1.2, // Reducción del tamaño de la portada
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    color: '#334155',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 10,
  },
});
