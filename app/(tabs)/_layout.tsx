import { Tabs } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Vibration } from 'react-native';
import { Animated } from 'react-native';

// Definir los props para el componente AnimatedIcon
interface AnimatedIconProps {
  Component: React.ComponentType<{ name: string; size: number; color: string }>;
  name: string;
  size: number;
  color: string;
  focused: boolean;
}

function AnimatedIcon({
  Component,
  name,
  size,
  color,
  focused,
}: AnimatedIconProps) {
  const scale = useSharedValue(focused ? 1.2 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 15,
      stiffness: 100,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Component name={name} size={size} color={color} />
    </Animated.View>
  );
}


export default function TabLayout() {
  let themeApp = useColorScheme()
  return (<>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6a0dad',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: [
          { backgroundColor: themeApp === 'dark' ? '#000' : '#fff' },
          styles.footer,
          Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <AnimatedIcon
              Component={Ionicons}
              name="home"
              size={25}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pediatria"
        options={{
          title: 'Pediatría',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <AnimatedIcon
              Component={FontAwesome5}
              name="baby"
              size={25}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="obstetricia"
        options={{
          title: 'Obstetricia',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <AnimatedIcon
              Component={MaterialCommunityIcons}
              name="mother-nurse"
              size={25}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="biblioteca"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <AnimatedIcon
              Component={FontAwesome5}
              name="book-medical"
              size={25}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <AnimatedIcon
              Component={Ionicons}
              name="settings-outline"
              size={25}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  </>

  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 0,
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});




