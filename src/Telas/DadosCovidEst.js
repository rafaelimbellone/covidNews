import React, { useState, useEffect } from 'react';
import api from '../api';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import Colors from '../Estilos/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView
} from 'react-native';
import LinearGrandient from 'react-native-linear-gradient';
import { TextInputMask } from 'react-native-masked-text';

export default function DadosCovidEst({ navigation }) {
    const route = useRoute();

    const [statesCases, setStatesCases] = useState([]);
    const [updatAt, setUpdatAt] = useState('');


    useEffect(() => {
        onStatesCases();
        updateDate();
    }, []);


    async function updateDate() {
        const result = await api.get('brazil');
        const { updated_at } = result.data.data;
        setUpdatAt(format(parseISO(updated_at), 'dd/MM/yyyy - H:mm'));

    }
    //função navega pra pagina Detail passando como parâmetro o state
    function navigateToDetail(states) {
        //navigation.navigate('detail', { state });
    }

    async function onStatesCases() {
        await api.get('/')
            .then((response) => {
                setStatesCases(response.data.data);
            });
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.States}>
                <ScrollView>
                    <Text style={styles.updatedData}>Última Atualização: {updatAt}</Text>
                    {statesCases.map(state => (
                        <LinearGrandient style={styles.listStates} colors={['#01ab9d', Colors.background2]}>
                        <TouchableOpacity style={styles.State}
                            key={state.uid}
                            onPress={() => { }}
                        >                            
                                <View style={styles.FlagAndCase}>
                                    <Image style={styles.Flag} source={{
                                        uri: `https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${state.uf}.png`,
                                    }}
                                    />
                                    <View style={styles.NameAndCase}>
                                        <Text style={styles.StateCases}>{state.state}</Text>
                                        <TextInputMask
                                            style={styles.StateConfimed}
                                            type={'money'}
                                            options={{
                                                precision: 0,
                                                separator: '.',
                                                delimiter: '.',
                                                unit: 'Confirmados: ',
                                                suffixUnit: '',
                                            }}
                                            value={state.cases}
                                            includeRawValueInChangeText={false}
                                        />
                                        <TextInputMask
                                            style={styles.StateDeaths}
                                            type={'money'}
                                            options={{
                                                precision: 0,
                                                separator: '.',
                                                delimiter: '.',
                                                unit: 'Mortes: ',
                                                suffixUnit: '',
                                            }}
                                            value={state.deaths}
                                            includeRawValueInChangeText={false}
                                        />
                                        <TextInputMask
                                            style={styles.StatesSuspects}
                                            type={'money'}
                                            options={{
                                                precision: 0,
                                                separator: '.',
                                                delimiter: '.',
                                                unit: 'Suspeitos: ',
                                                suffixUnit: '',
                                            }}
                                            value={state.suspects}
                                            
                                        />
                                    </View>
                                </View>                            
                        </TouchableOpacity>
                        </LinearGrandient>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background2,
    },
    listStates:{
         flex:1,
         borderRadius:5,
    },
    States: {
        margin: 10,
    },
    updatedData: {
        fontSize: 14,
        color: Colors.branco,
        marginBottom: 3,
        marginTop: 3,
        textAlign: 'center',
    },

    State: {
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        shadowColor: Colors.corBordas,
        shadowOpacity: 0.10,
        shadowRadius: 2.22,
        elevation: 2,
    },
    FlagAndCase: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Flag: {
        width: 75,
        height: 65,
        borderRadius: 5,
        
    },
    NameAndCase: {
        marginLeft: 10,        
    },
    StateConfimed: {
        fontSize: 15,
        color: Colors.branco,
        marginBottom: 1,
        marginTop: -5,
    },
    StateDeaths:{
        fontSize: 15,
        color: Colors.branco,
        marginBottom: 1,
        marginTop: -25,
    },
    StatesSuspects: {
        fontSize: 15,
        color: Colors.branco,
        marginBottom: 1,
        marginTop: -25,
    },
    StateCases: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.branco,
    }
})