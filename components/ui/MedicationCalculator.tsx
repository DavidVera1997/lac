import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native';

// Definición de tipos
interface Medication {
  name: string;
  presentation: string;
  min: number;
  max: number;
  frequency: string;
  duration: string;
  concentration?: { mg: number; ml: number };
}

const medicationDosage: Record<string, Medication> = {
  paracetamol: {
    name: 'Paracetamol',
    presentation: 'Tab 500mg',
    min: 10,
    max: 15,
    frequency: 'Cada 6h',
    duration: '5 días',
  },
  fumarato_ferroso: {
    name: 'Fumarato Ferroso',
    presentation: 'Tab 200mg/66mg Fe elemental',
    min: 6,
    max: 10,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  loratadina: {
    name: 'Loratadina',
    presentation: 'Tab 10mg',
    min: 5,
    max: 5,
    frequency: 'Cada 12h',
    duration: '5 días',
  },
  dimenhidrato: {
    name: 'Dimenhidrato',
    presentation: 'Tab 50mg',
    min: 5,
    max: 5,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  cimetidina: {
    name: 'Cimetidina',
    presentation: 'Tab 200mg',
    min: 20,
    max: 30,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  clorodiaxepoxido: {
    name: 'Clorodiaxepoxido',
    presentation: 'Tab 10mg',
    min: 0.2,
    max: 0.7,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  ciproheptadina: {
    name: 'Ciproheptadina',
    presentation: 'Tab 4mg',
    min: 0.125,
    max: 0.125,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  prednisona: {
    name: 'Prednisona',
    presentation: 'Tab 5mg',
    min: 1,
    max: 2,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  diazepam: {
    name: 'Diazepam',
    presentation: 'Tab 5mg',
    min: 0.25,
    max: 0.50,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  metoclopramida: {
    name: 'Metoclopramida',
    presentation: 'Tab 10mg',
    min: 0.5,
    max: 1,
    frequency: 'Cada 1d',
    duration: '5 días',
  },
  paracetamol_jarabe: {
    name: 'Paracetamol',
    presentation: 'jarabe 120mg/5ml',
    min: 10,
    max: 15,
    frequency: 'Cada 1d',
    duration: '5 días',
    concentration: { mg: 1200, ml: 5 },
  },
  dipirona: {
    name: 'Dipirona',
    presentation: 'amp 600mg/2cc',
    min: 10,
    max: 15,
    frequency: 'Cada 1d',
    duration: '1 días',
  },
  hidrocortisona: {
    name: 'Hidrocortisona',
    presentation: 'Bbo 100mg/2cc',
    min: 5,
    max: 10,
    frequency: 'Cada 1d',
    duration: '1 días',
  },
  amoxicilina_suspension: {
    name: 'Amoxicilina',
    presentation: 'Susp 250mg/5ml',
    min: 40,
    max: 40,
    frequency: 'Cada 8h',
    duration: '10 días',
    concentration: { mg: 250, ml: 5 },
  },
  ibuprofeno_suspension: {
    name: 'Ibuprofeno',
    presentation: 'Susp 100mg/5ml',
    min: 5,
    max: 10,
    frequency: 'Cada 6-8h',
    duration: '5-7 días',
    concentration: { mg: 100, ml: 5 },
  },
  cefalexina_supension: {
    name: 'Cefalexina',
    presentation: 'Susp 250mg/5ml',
    min: 25,
    max: 50,
    frequency: 'Cada 6-12h',
    duration: '7-14 días',
    concentration: { mg: 250, ml: 5 },
  },
  azitromicina_suspension: {
    name: 'Azitromicina',
    presentation: 'Susp 200mg/5ml',
    min: 10,
    max: 10,
    frequency: 'Cada 24h',
    duration: '3-5 días',
    concentration: { mg: 200, ml: 5 },
  },
  amoxicilina_clavulanico: {
    name: 'Amoxicilina/Clavulánico',
    presentation: 'Susp 200mg/28.5mg/5ml',
    min: 25,
    max: 45,
    frequency: 'Cada 12h',
    duration: '10 días',
    concentration: { mg: 200, ml: 5 },
  },
  ceftriaxona: {
    name: 'Ceftriaxona',
    presentation: 'Inyectable 250mg',
    min: 50,
    max: 75,
    frequency: 'Cada 24h',
    duration: '7-14 días',
  },
  salbutamol: {
    name: 'Salbutamol',
    presentation: 'Aerosol 100mcg/dosis',
    min: 100,
    max: 200,
    frequency: 'Cada 4-6h',
    duration: 'Según necesidad',
  },
  loratadina_jarabe: {
    name: 'Loratadina',
    presentation: 'Jarabe 5mg/5ml',
    min: 5,
    max: 10,
    frequency: 'Cada 24h',
    duration: '7-10 días',
    concentration: { mg: 5, ml: 5 },
  },
  acetaminofén: {
    name: 'Acetaminofén',
    presentation: 'Tab 500mg',
    min: 10,
    max: 15,
    frequency: 'Cada 6h',
    duration: '5 días',
  },
  eritromicina_suspension: {
    name: 'Eritromicina',
    presentation: 'Susp 200mg/5ml',
    min: 30,
    max: 50,
    frequency: 'Cada 6-8h',
    duration: '7-10 días',
    concentration: { mg: 200, ml: 5 },
  },
  metronidazol_suspension: {
    name: 'Metronidazol',
    presentation: 'Susp 125mg/5ml',
    min: 15,
    max: 30,
    frequency: 'Cada 8h',
    duration: '5-7 días',
    concentration: { mg: 125, ml: 5 },
  },
  claritromicina_suspension: {
    name: 'Claritromicina',
    presentation: 'Susp 250mg/5ml',
    min: 15,
    max: 15,
    frequency: 'Cada 12h',
    duration: '7-10 días',
    concentration: { mg: 250, ml: 5 },
  },
  omeprazol: {
    name: 'Omeprazol',
    presentation: 'Cap 20mg',
    min: 0.7,
    max: 1.5,
    frequency: 'Cada 24h',
    duration: '4-8 semanas',
  },
  ranitidina_suspension: {
    name: 'Ranitidina',
    presentation: 'Susp 15mg/ml',
    min: 2,
    max: 4,
    frequency: 'Cada 12h',
    duration: '4-8 semanas',
    concentration: { mg: 15, ml: 1 },
  },
};

const infoMessages: Record<string, string> = {
  paracetamol: 'No exceder 5 dosis/día.',
  fumarato_ferroso: 'pendiente',
  loratadina: 'pendiente',
  dimenhidrato: 'pendiente',
  cimetidina: 'pendiente',
  clorodiaxepoxido: 'pendiente',
  ciproheptadina: 'pendiente',
  prednisona: 'pendiente',
  diazepam: 'pendiente',
  metoclopramida: 'pendiente',
  paracetamol_jarabe: 'pendiente',
  dipirona: 'pendiente',
  hidrocortisona: 'pendiente',
  amoxicilina_suspension: 'Completar tratamiento.',
  ibuprofeno: 'Tomar con alimentos para evitar irritación gástrica.',
  cefalexina_suspension: 'Completar el curso completo del tratamiento.',
  azitromicina_suspension: 'Tomar con el estómago vacío, una hora antes o dos horas después de las comidas.',
  amoxicilina_clavulanico: 'Tomar con comida para mejorar la absorción y reducir molestias estomacales.',
  ceftriaxona: 'Administrar solo bajo supervisión médica.',
  salbutamol: 'Usar según sea necesario y no exceder la dosis máxima diaria.',
  loratadina_jarabe: 'pendiente',
  acetaminofén: 'No exceder 5 dosis/día.',
  eritromicina: 'Completar el curso completo del tratamiento.',
  metronidazol: 'Evitar el consumo de alcohol durante el tratamiento.',
  claritromicina_suspension: 'Completar el curso completo del tratamiento.',
  omeprazol: 'Tomar antes de las comidas.',
  ranitidina_suspension: 'Tomar antes de las comidas.',
};


const calculateDailyDoses = (frequency: string): number => {
  if (frequency.includes('4h')) return 6;
  if (frequency.includes('6h')) return 4;
  if (frequency.includes('8h')) return 3;
  if (frequency.includes('12h')) return 2;
  if (frequency.includes('1d')) return 1;
};

export default function MedicationCalculator() {
  const [selectedMedication, setSelectedMedication] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const calculateMedication = () => {
    setError('');
    setResult('');
    setInfo('');
    if (!selectedMedication || !medicationDosage[selectedMedication]) {
      setError('Seleccione un medicamento válido.');
      return;
    }
    if (!weight || parseFloat(weight) <= 0) {
      setError('Ingrese un peso > 0.');
      return;
    }

    const dosageRange = medicationDosage[selectedMedication];
    const weightNum = parseFloat(weight);
    const dailyMinDose = (weightNum * dosageRange.min).toFixed(2);
    const dailyMaxDose = (weightNum * dosageRange.max).toFixed(2);
    const dailyDoses = calculateDailyDoses(dosageRange.frequency);
    const dosePerAdministrationMin = (parseFloat(dailyMinDose) / dailyDoses).toFixed(2);
    const dosePerAdministrationMax = (parseFloat(dailyMaxDose) / dailyDoses).toFixed(2);

    let resultMessage = '';
    if (dosageRange.min === dosageRange.max) {
      resultMessage = `Dosis/toma: ${dosePerAdministrationMin} mg`;
      if (dosageRange.concentration) {
        const { mg, ml } = dosageRange.concentration;
        const mlDose = ((parseFloat(dosePerAdministrationMin) * ml) / mg).toFixed(2);
        resultMessage += ` (${mlDose} ml)`;
      }
    } else {
      resultMessage = `Dosis/toma: ${dosePerAdministrationMin}-${dosePerAdministrationMax} mg`;
      if (dosageRange.concentration) {
        const { mg, ml } = dosageRange.concentration;
        const mlDoseMin = ((parseFloat(dosePerAdministrationMin) * ml) / mg).toFixed(2);
        const mlDoseMax = ((parseFloat(dosePerAdministrationMax) * ml) / mg).toFixed(2);
        resultMessage += ` (${mlDoseMin}-${mlDoseMax} ml)`;
      }
    }

    resultMessage += `\n${dosageRange.presentation}\nFrecuencia: ${dosageRange.frequency}\nDuración: ${dosageRange.duration}`;
    setResult(resultMessage);
    setInfo(infoMessages[selectedMedication] || '');
  };

  const getCalculationExplanation = (): string => {
    if (!selectedMedication || !medicationDosage[selectedMedication]) {
      return 'Seleccione un medicamento.';
    }

    const dosageRange = medicationDosage[selectedMedication];
    const weightNum = parseFloat(weight);
    const dailyMinDose = (weightNum * dosageRange.min).toFixed(2);
    const dailyMaxDose = (weightNum * dosageRange.max).toFixed(2);
    const dailyDoses = calculateDailyDoses(dosageRange.frequency);

    let explanation = `Explicación del cálculo:\n\n`;
    explanation += `1. Peso del paciente: ${weightNum} kg\n`;
    explanation += `2. Rango de dosis diaria: ${dosageRange.min}-${dosageRange.max} mg/kg/día\n`;
    explanation += `3. Dosis diaria total: ${dailyMinDose}-${dailyMaxDose} mg\n`;
    explanation += `4. Número de tomas diarias: ${dailyDoses} (${dosageRange.frequency})\n`;
    explanation += `5. Fórmula para dosis por toma: Dosis diaria total ÷ Número de tomas\n`;
    explanation += `   - Dosis por toma: ${(parseFloat(dailyMinDose) / dailyDoses).toFixed(2)}-${(parseFloat(dailyMaxDose) / dailyDoses).toFixed(2)} mg`;

    if (dosageRange.concentration) {
      const { mg, ml } = dosageRange.concentration;
      explanation += `\n6. Conversión a ml: (Dosis en mg × ${ml}) ÷ ${mg}\n`;
      explanation += `   - Resultado: ${((parseFloat(dailyMinDose) / dailyDoses) * ml / mg).toFixed(2)}-${((parseFloat(dailyMaxDose) / dailyDoses) * ml / mg).toFixed(2)} ml`;
    }

    return explanation;
  };
  let themeApp = useColorScheme()
  return (
    <View style={themeApp === 'dark' ? styles.containerDark : styles.container}>
      <Text style={themeApp === 'dark' ? styles.titleDark : styles.title}>Dosis Pediátricas</Text>
      <View style={styles.inputGroup}>
        <Text style={themeApp === 'dark' ? styles.labeldark : styles.label}>Selecciona el Medicamento:</Text>
        <Picker
          selectedValue={selectedMedication}
          style={themeApp === 'dark' ? {
            backgroundColor: '#000'
          } : styles.picker}
          dropdownIconColor={themeApp === 'dark' ? '#fff' : '#000'}
          onValueChange={(itemValue: string) => setSelectedMedication(itemValue)}
        >
          <Picker.Item label="-- Selecciona el Medicamento --" value="" style={themeApp === 'dark' && { color: '#fff', backgroundColor: '#000' }} />
          {Object.keys(medicationDosage).map((medication) => (
            <Picker.Item
              style={themeApp === 'dark' ? { color: '#fff', backgroundColor: '#000' } : { color: '#000' }}
              key={medication}
              label={`${medicationDosage[medication].name} (${medicationDosage[medication].presentation})`}
              value={medication}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Text style={themeApp === 'dark' ? styles.labeldark : styles.label}>Peso (kg):</Text>
        <TextInput
          style={themeApp === 'dark' ? styles.inputDark : styles.input}
          keyboardType="numeric"
          placeholder="Peso en kg"
          placeholderTextColor={themeApp === 'dark' ? '#fff' : '#000'}
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateMedication}>
        <Text style={styles.buttonText}>Calcular Dosis</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {
        result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>
              {result.split('\n').map((line, index) => (
                <Text key={index}>
                  {line}
                  {'\n'}
                </Text>
              ))}
            </Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.helpIcon}>
              <Text style={styles.helpIconText}>?</Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
      {info ? <Text style={styles.info}>{info}</Text> : null}

      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Explicación del Cálculo</Text>
            <Text style={styles.modalText}>{getCalculationExplanation()}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 20,
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  labeldark: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  picker: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  inputDark: {
    width: '100%',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#7b1fa2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  resultContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 15,
  },
  result: {
    backgroundColor: '#e1bee7',
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    textAlign: 'left',
    color: '#4a148c',
  },
  helpIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#7b1fa2',
    borderRadius: 10,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIconText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a148c',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  modalCloseButton: {
    backgroundColor: '#7b1fa2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
