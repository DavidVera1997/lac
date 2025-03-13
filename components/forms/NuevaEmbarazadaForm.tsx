import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Modal,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

interface Embarazada {
    nombreCompleto: string;
    fechaNacimiento: string;
    peso: string;
    talla: string;
    dbps: string; // Nuevo campo para DBPS
    telefono: string; // Número de teléfono
    consultorio: string; // Consultorio
    edad: number;
    vacunas: string[];
    ultimoCtrl: string;
    proximoCtrl: string;
    grupoRiesgo: number;
    au: number;
}

interface FormProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onSave: (embarazada: Embarazada) => void;
}

const vacunasDisponibles = [
    'BCG',
    'Hepatitis B',
    'Pentavalente',
    'Polio',
    'Neumococo',
    'Sarampión/Rubéola',
];

export default function NuevaEmbarazadaForm({
    modalVisible,
    setModalVisible,
    onSave,
}: FormProps): JSX.Element {
    const [nuevaEmbarazada, setNuevaEmbarazada] = useState<Embarazada>({
        nombreCompleto: '',
        fechaNacimiento: '',
        peso: '',
        talla: '',
        dbps: '',
        telefono: '',
        consultorio: '', // Campo de consultorio
        edad: 0,
        vacunas: [],
        ultimoCtrl: '',
        proximoCtrl: '',
        grupoRiesgo: 0,
        au: 0,
    });

    const toggleVacuna = (vacuna: string) => {
        setNuevaEmbarazada((prevState) => {
            const vacunas = prevState.vacunas.includes(vacuna)
                ? prevState.vacunas.filter((v) => v !== vacuna)
                : [...prevState.vacunas, vacuna];
            return { ...prevState, vacunas };
        });
    };

    const handleSave = (): void => {
        const hoy = new Date(); // Fecha actual
        const nacimiento = new Date('2025-03-13'); // Convertir a objeto Date
        let edadCalculada = hoy.getFullYear() - nacimiento.getFullYear(); // Diferencia de años
        onSave(nuevaEmbarazada);
        setNuevaEmbarazada({
            ...nuevaEmbarazada,
            nombreCompleto: '',
            fechaNacimiento: '',
            peso: '',
            talla: '',
            dbps: '',
            telefono: '55555555',
            consultorio: '',
            vacunas: [],
            au: 0,
            edad: edadCalculada,
            grupoRiesgo: 0,
            proximoCtrl: '',
            ultimoCtrl: ''

        });
        setModalVisible(false);
    };

    return (
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <ScrollView contentContainerStyle={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Agregar Embarazada</Text>

                    {/* Campo de nombre completo */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        value={nuevaEmbarazada.nombreCompleto}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({ ...nuevaEmbarazada, nombreCompleto: text })
                        }
                    />

                    {/* Campo de fecha de nacimiento */}
                    <TextInput
                        style={styles.input}
                        placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                        value={nuevaEmbarazada.fechaNacimiento}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({ ...nuevaEmbarazada, fechaNacimiento: text })
                        }
                    />

                    {/* Campo de peso */}
                    <TextInput
                        style={styles.input}
                        placeholder="Peso (kg)"
                        keyboardType="numeric"
                        value={nuevaEmbarazada.peso}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({
                                ...nuevaEmbarazada,
                                peso: text.replace(/[^0-9.]/g, ''), // Solo números y punto decimal
                            })
                        }
                    />

                    {/* Campo de talla */}
                    <TextInput
                        style={styles.input}
                        placeholder="Talla (cm)"
                        keyboardType="numeric"
                        value={nuevaEmbarazada.talla}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({
                                ...nuevaEmbarazada,
                                talla: text.replace(/[^0-9.]/g, ''), // Solo números y punto decimal
                            })
                        }
                    />


                    {/* Campo de DBPS */}
                    <TextInput
                        style={styles.input}
                        placeholder="DBPS"
                        value={nuevaEmbarazada.dbps}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({ ...nuevaEmbarazada, dbps: text })
                        }
                    />

                    {/* Campo de teléfono */}
                    <TextInput
                        style={styles.input}
                        placeholder="Número de teléfono"
                        keyboardType="numeric"
                        value={nuevaEmbarazada.telefono}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({
                                ...nuevaEmbarazada,
                                telefono: text, // Solo números
                            })
                        }
                    />

                    {/* Campo de consultorio */}
                    <TextInput
                        style={styles.input}
                        placeholder="Consultorio"
                        value={nuevaEmbarazada.consultorio}
                        onChangeText={(text) =>
                            setNuevaEmbarazada({ ...nuevaEmbarazada, consultorio: text })
                        }
                    />

                    {/* Lista de vacunas */}
                    <Text style={styles.label}>Vacunas:</Text>
                    <View style={styles.checkboxContainer}>
                        {vacunasDisponibles.map((vacuna) => (
                            <TouchableOpacity
                                key={vacuna}
                                style={[
                                    styles.checkbox,
                                    nuevaEmbarazada.vacunas.includes(vacuna) && styles.checkboxChecked,
                                ]}
                                onPress={() => toggleVacuna(vacuna)}
                            >
                                <Text style={styles.checkboxText}>{vacuna}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Botones de acción */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6a0dad',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#6a0dad',
    },
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    selectorOption: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    selectorOptionSelected: {
        backgroundColor: '#6a0dad',
    },
    selectorText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    checkbox: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    checkboxChecked: {
        backgroundColor: '#6a0dad',
    },
    checkboxText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#6a0dad',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
