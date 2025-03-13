import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  Vibration,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

interface EmbarazadaHeaderProps {
  setBusqueda: (text: string) => void;
  darkTheme: boolean;
  toggleTheme: () => void;
}

export default function EmbarazadaHeader({
  setBusqueda,
  darkTheme,
  toggleTheme,
}: EmbarazadaHeaderProps): JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  // Valores animados para las animaciones
  const searchScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const tipFadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = useCallback(() => {
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
      Animated.timing(tipFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [searchScale, fadeAnim, tipFadeAnim, scaleAnim]);

  const handleBlur = useCallback(() => {
    if (!searchText) {
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
        Animated.timing(tipFadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [searchText, searchScale, fadeAnim, tipFadeAnim, scaleAnim]);

  const handleThemeToggle = useCallback(() => {
    Vibration.vibrate(50);
    // Se utiliza rotateAnim._value para determinar el estado actual (esto es una solución rápida)
    Animated.timing(rotateAnim, {
      toValue: (rotateAnim as any)._value === 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    toggleTheme();
  }, [rotateAnim, toggleTheme]);

  const handleSearchChange = useCallback(
    (text: string): void => {
      setSearchText(text);
      setBusqueda(text);
    },
    [setBusqueda]
  );

  let themeApp = useColorScheme()
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        handleBlur();
      }}
    >
      <View style={[styles.container, themeApp === 'dark' && styles.containerDark]}>
        {/* Título */}
        <Animated.Text style={[styles.title, { opacity: fadeAnim }, themeApp === "dark" && styles.titleDark]}>
          Obstetricia
        </Animated.Text>
        {/* Texto de ayuda */}
        <Animated.Text style={[styles.tipText, { opacity: tipFadeAnim }]}>
          Busca embarazadas por nombre o categoría...
        </Animated.Text>
        {/* Barra de búsqueda */}
        <Animated.View
          style={[
            styles.searchContainer,
            { transform: [{ scale: searchScale }] },
            themeApp === 'dark' && styles.searchContainerDark,
          ]}
        >
          <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={[styles.input, themeApp === 'dark' && styles.inputDark, isFocused && styles.inputFocused]}
            placeholder="Buscar..."
            placeholderTextColor="#64748b"
            value={searchText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleSearchChange}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => handleSearchChange('')} style={styles.clearButton}>
              <Ionicons name="close" size={20} color="#64748b" />
            </TouchableOpacity>
          )}
        </Animated.View>
        {/* Botón de cambio de tema */}
        {/* <View style={styles.themeButtonContainer}>
          <Animated.View
            style={[
              styles.themeButton,
              darkTheme && styles.themeButtonDark,
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
              <Ionicons name={darkTheme ? 'sunny' : 'moon'} size={24} color={darkTheme ? '#fff' : '#000'} />
            </TouchableOpacity>
          </Animated.View>
        </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 70 : (StatusBar.currentHeight || 0) + 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#f8fafc',
  },
  containerDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6a0dad',
    marginBottom: 35,
    textAlign: 'center',
  },
  titleDark: {
    color: '#fff',
  },
  tipText: {
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
    paddingVertical: 6,
    marginBottom: 5,
    elevation: 5,
  },
  searchContainerDark: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    height: '100%',
  },
  inputDark: {
    color: '#fff',
  },
  inputFocused: {
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  themeButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 15 : 5,
    right: 20,
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

