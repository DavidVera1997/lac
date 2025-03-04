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

interface Lactante {
    nombreCompleto: string;
    fechaNacimiento: string;
    peso: string;
    talla: string;
    cc: string; // Circunferencia cefálica
    dbps: string; // Nuevo campo para DBPS
    sexo: string; // Campo de sexo
    telefono: string; // Número de teléfono
    tipoAlimentacion: string; // Alimentación
    familiaFuncional: string; // Familia funcional
    consultorio: string; // Consultorio
    edad: string;
    percentilPesoTalla: number;
    percentilTallaEdad: number;
    percentilPesoEdad: number;
    vacunas: string[];
    ultimoCtrl: string;
    proximoCtrl: string;
    grupoRiesgo: number;
}

interface FormProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onSave: (lactante: Lactante) => void;
}

const vacunasDisponibles = [
    'BCG',
    'Hepatitis B',
    'Pentavalente',
    'Polio',
    'Neumococo',
    'Sarampión/Rubéola',
];

export default function NuevoLactanteForm({
    modalVisible,
    setModalVisible,
    onSave,
}: FormProps): JSX.Element {
    const [nuevoLactante, setNuevoLactante] = useState<Lactante>({
        nombreCompleto: '',
        fechaNacimiento: '',
        peso: '',
        talla: '',
        cc: '',
        dbps: '',
        sexo: 'masculino', // Valor predeterminado
        telefono: '',
        tipoAlimentacion: '',
        familiaFuncional: 'Funcional', // Valor predeterminado
        consultorio: '', // Campo de consultorio
        edad: '',
        percentilPesoTalla: 0,
        percentilTallaEdad: 0,
        percentilPesoEdad: 0,
        vacunas: [],
        ultimoCtrl: '',
        proximoCtrl: '',
        grupoRiesgo: 0,
    });

    const toggleVacuna = (vacuna: string) => {
        setNuevoLactante((prevState) => {
            const vacunas = prevState.vacunas.includes(vacuna)
                ? prevState.vacunas.filter((v) => v !== vacuna)
                : [...prevState.vacunas, vacuna];
            return { ...prevState, vacunas };
        });
    };

    const handleSave = (): void => {
        onSave(nuevoLactante);
        setNuevoLactante({
            ...nuevoLactante,
            nombreCompleto: '',
            fechaNacimiento: '',
            peso: '',
            talla: '',
            cc: '',
            dbps: '',
            sexo: 'masculino',
            telefono: '',
            tipoAlimentacion: '',
            familiaFuncional: 'Funcional',
            consultorio: '',
            vacunas: [],
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
                    <Text style={styles.modalTitle}>Agregar Lactante</Text>

                    {/* Campo de nombre completo */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        value={nuevoLactante.nombreCompleto}
                        onChangeText={(text) =>
                            setNuevoLactante({ ...nuevoLactante, nombreCompleto: text })
                        }
                    />

                    {/* Campo de fecha de nacimiento */}
                    <TextInput
                        style={styles.input}
                        placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                        value={nuevoLactante.fechaNacimiento}
                        onChangeText={(text) =>
                            setNuevoLactante({ ...nuevoLactante, fechaNacimiento: text })
                        }
                    />

                    {/* Campo de peso */}
                    <TextInput
                        style={styles.input}
                        placeholder="Peso (kg)"
                        keyboardType="numeric"
                        value={nuevoLactante.peso}
                        onChangeText={(text) =>
                            setNuevoLactante({
                                ...nuevoLactante,
                                peso: text.replace(/[^0-9.]/g, ''), // Solo números y punto decimal
                            })
                        }
                    />

                    {/* Campo de talla */}
                    <TextInput
                        style={styles.input}
                        placeholder="Talla (cm)"
                        keyboardType="numeric"
                        value={nuevoLactante.talla}
                        onChangeText={(text) =>
                            setNuevoLactante({
                                ...nuevoLactante,
                                talla: text.replace(/[^0-9.]/g, ''), // Solo números y punto decimal
                            })
                        }
                    />

                    {/* Campo de circunferencia cefálica */}
                    <TextInput
                        style={styles.input}
                        placeholder="Circunferencia Cefálica (cm)"
                        keyboardType="numeric"
                        value={nuevoLactante.cc}
                        onChangeText={(text) =>
                            setNuevoLactante({
                                ...nuevoLactante,
                                cc: text.replace(/[^0-9.]/g, ''), // Solo números y punto decimal
                            })
                        }
                    />

                    {/* Campo de DBPS */}
                    <TextInput
                        style={styles.input}
                        placeholder="DBPS"
                        value={nuevoLactante.dbps}
                        onChangeText={(text) =>
                            setNuevoLactante({ ...nuevoLactante, dbps: text })
                        }
                    />

                    {/* Campo de teléfono */}
                    <TextInput
                        style={styles.input}
                        placeholder="Número de teléfono"
                        keyboardType="numeric"
                        value={nuevoLactante.telefono}
                        onChangeText={(text) =>
                            setNuevoLactante({
                                ...nuevoLactante,
                                telefono: text.replace(/[^0-9]/g, ''), // Solo números
                            })
                        }
                    />

                    {/* Campo de consultorio */}
                    <TextInput
                        style={styles.input}
                        placeholder="Consultorio"
                        value={nuevoLactante.consultorio}
                        onChangeText={(text) =>
                            setNuevoLactante({ ...nuevoLactante, consultorio: text })
                        }
                    />

                    {/* Campo de tipo de alimentación */}
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de Alimentación"
                        value={nuevoLactante.tipoAlimentacion}
                        onChangeText={(text) =>
                            setNuevoLactante({ ...nuevoLactante, tipoAlimentacion: text })
                        }
                    />

                    {/* Selector de familia funcional */}
                    <Text style={styles.label}>Familia Funcional:</Text>
                    <View style={styles.selectorContainer}>
                        <TouchableOpacity
                            style={[
                                styles.selectorOption,
                                nuevoLactante.familiaFuncional === 'Funcional' && styles.selectorOptionSelected,
                            ]}
                            onPress={() =>
                                setNuevoLactante({ ...nuevoLactante, familiaFuncional: 'Funcional' })
                            }
                        >
                            <Text style={styles.selectorText}>Funcional</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.selectorOption,
                                nuevoLactante.familiaFuncional === 'Disfuncional' && styles.selectorOptionSelected,
                            ]}
                            onPress={() =>
                                setNuevoLactante({ ...nuevoLactante, familiaFuncional: 'Disfuncional' })
                            }
                        >
                            <Text style={styles.selectorText}>Disfuncional</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Selector de género */}
                    <Text style={styles.label}>Sexo:</Text>
                    <View style={styles.selectorContainer}>
                        <TouchableOpacity
                            style={[
                                styles.selectorOption,
                                nuevoLactante.sexo === 'masculino' && styles.selectorOptionSelected,
                            ]}
                            onPress={() => setNuevoLactante({ ...nuevoLactante, sexo: 'masculino' })}
                        >
                            <Text style={styles.selectorText}>Masculino</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.selectorOption,
                                nuevoLactante.sexo === 'femenino' && styles.selectorOptionSelected,
                            ]}
                            onPress={() => setNuevoLactante({ ...nuevoLactante, sexo: 'femenino' })}
                        >
                            <Text style={styles.selectorText}>Femenino</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lista de vacunas */}
                    <Text style={styles.label}>Vacunas:</Text>
                    <View style={styles.checkboxContainer}>
                        {vacunasDisponibles.map((vacuna) => (
                            <TouchableOpacity
                                key={vacuna}
                                style={[
                                    styles.checkbox,
                                    nuevoLactante.vacunas.includes(vacuna) && styles.checkboxChecked,
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
