import React, { useEffect, useState, FlatList } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import api from '../api';
import Colors from '../Estilos/Colors';
import Button, { ActionSecondaryButton } from '../Ulteis/Buttom';
import LinearGrandient from 'react-native-linear-gradient';

const ModalEstados = ({ children, onCancel, onConfirm, isVisible }) => {

    const [estados, setEstados] = useState([]);

    async function onStatesCases() {
        await api.get('/')
            .then((response) => {
                setEstados(response.data.data);
            });
    }


    useEffect(() => {
        onStatesCases();
        // updateDate();
    }, []);
    return (
        <Modal animated='slide' transparent={false} visible={isVisible}>
            <ScrollView >
                <View style={styles.modal}>
                    {estados.map(estado => (
                        <View >
                            <TouchableOpacity key={estado.uid} style={styles.modalItem}
                                onPress={() => { onConfirm(estado) }}
                            >
                                <Image style={styles.Flag} source={{
                                    uri: `https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${estado.uf}.png`,
                                }}
                                />
                                 <View style={{alignItems:'center', justifyContent:'center', alignSelf:'center'}}>
                                   <Text style={styles.modalItemText}>{estado.state}</Text>
                                </View>
                                <TouchableOpacity></TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Button>
                <ActionSecondaryButton title={'Fechar'} onPress={onCancel} />
            </Button>
        </Modal>


    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Colors.background2,
    },
    modalItem: {
        backgroundColor: Colors.asphalt,
        marginVertical: 1,
        marginHorizontal: 20,
        padding: 20,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },
    modalItemText: {        
        fontSize: 22,
        color: Colors.branco,
    },
    primaryButton: {
        width: 200,
        height: 55,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.background2,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    primaryButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.background2
    },

    FlagAndCase: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        padding: 5,
    },
    FlagView: {
        flex: 1,
        marginLeft: 12,
    },
    Flag: {
        width: 55,
        height: 45,
        borderRadius: 5,

    },
    listStates: {
        flex: 1,
        borderRadius: 5,

    },
})

export default ModalEstados;