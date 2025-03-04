import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

const pdfSource: { uri: string; cache: boolean } = { uri: FileSystem.documentDirectory + 'libro1.pdf', cache: true };

export default function Libro() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Pdf
        source={pdfSource}
        style={styles.pdf}
        onLoadComplete={(numberOfPages: number) => console.log(`Cargado con ${numberOfPages} páginas`)}
        onError={(error: any) => console.log(error)}
      /> */}

      <TouchableOpacity onPress={() => router.back()} style={styles.botonVolver}>
        <Text style={styles.textoBoton}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 10 },
  pdf: { flex: 1, width: '100%', height: '100%' },
  botonVolver: { margin: 10, padding: 10, backgroundColor: '#6a0dad', borderRadius: 10, alignItems: 'center' },
  textoBoton: { color: 'white', fontSize: 18 },
});


