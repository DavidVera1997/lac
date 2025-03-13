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
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

interface HeaderProps {
    setBusqueda: (text: string) => void;
    darkTheme: boolean;
    toggleTheme: () => void;
}

export default function Header({
    setBusqueda,
    darkTheme,
    toggleTheme,
}: HeaderProps): JSX.Element {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    // Valores animados
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
        Animated.timing(rotateAnim, {
            toValue: (rotateAnim as any)._value === 0 ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        toggleTheme();
    }, [rotateAnim, toggleTheme]);

    const handleSearchChange = useCallback((text: string): void => {
        setSearchText(text);
        setBusqueda(text);
    }, [setBusqueda]);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
                handleBlur();
            }}
        >
            <View style={[styles.container, darkTheme && styles.containerDark]}>
                {/* Título */}
                <Animated.Text style={[styles.title, { opacity: fadeAnim }, darkTheme && styles.titleDark]}>
                    Pediatría
                </Animated.Text>
                {/* Texto de ayuda */}
                <Animated.Text style={[styles.tipText, { opacity: tipFadeAnim }]}>
                    Busca lactantes por nombre o categoría...
                </Animated.Text>
                {/* Barra de búsqueda */}
                <Animated.View
                    style={[styles.searchContainer, { transform: [{ scale: searchScale }] }, darkTheme && styles.searchContainerDark]}
                >
                    <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
                    <TextInput
                        style={[styles.input, darkTheme && styles.inputDark, isFocused && styles.inputFocused]}
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
        paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 20,
        paddingHorizontal: 16, // Ajustado al diseño del segundo código
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
        fontSize: 28, // Tamaño ajustado al segundo código
        fontWeight: '700',
        color: '#6a0dad',
        marginBottom: 25,
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
        borderRadius: 20, // Ajustado al diseño del segundo código
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginBottom: 8,
        elevation: 4,
    },
    searchContainerDark: {
        backgroundColor: 'rgba(255,255,255,0.25)',
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14, // Tamaño de texto ajustado
        color: '#000',
        padding: 0,
        height: '100%',
    },
    inputDark: {
        color: '#fff',
    },
    inputFocused: {
        fontSize: 14, // Ajustado según el diseño
    },
    clearButton: {
        padding: 5,
    },
    themeButtonContainer: {
        position: 'absolute',
        top: 10, // Ajustado según el diseño
        right: 16,
    },
    themeButton: {
        width: 40, // Tamaño ajustado
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    themeButtonDark: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        shadowOpacity: 0.15,
    },
});


