import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function HapticTab({ title, onPress }:{title:string; onPress:any}) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.tab} onPress={handlePress}>
      <Text style={styles.tabText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    padding: 15,
    backgroundColor: '#6200ea',
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
});


