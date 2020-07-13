
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import api from '../api';
import { PieChart } from 'react-native-svg-charts';
import { format, parseISO } from 'date-fns';
import Colors from '../Estilos/Colors';
import LinearGrandient from 'react-native-linear-gradient';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-community/async-storage';


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function dadosCovidBr() {
    const [confirmedCases, setConfirmedCases] = useState();
    const [deathsCases, setDeathsCases] = useState();
    const [recoveredCases, setRecoveredCases] = useState();
    const [totalCases, setTotalCases] = useState();
    const [taxaLetalidade, setTaxaLetalidade] = useState();
    const [taxaRecuperados, setTaxaRecuperados] = useState();
    const [deaths24Hrs, setDeaths24Hrs] = useState();
    const [updatedAt, setUpdateAt] = useState('');

    useEffect(() => {
        onCases();
    }, []);
    // Função pega os dados da api.
    const onCases = async () => {
        await api.get('brazil')
            .then((response) => {
                const { confirmed, deaths, recovered, updated_at } = response.data.data;
                // Soma o Total de Casos(Confirmados, Mortes e Recuperados).
                const Total = confirmed + deaths + recovered;
                // Calcula a Taxa de Letalidade.
                const taxa = ((deaths / confirmed) * 100).toFixed(2);
                // Calcula a Taxa de Recuperados.
                const recuperados = ((recovered / confirmed) * 100).toFixed(2);
                setConfirmedCases(confirmed);
                setDeathsCases(deaths);
                setRecoveredCases(recovered);
                setTotalCases(Total);
                setTaxaLetalidade(taxa);
                setTaxaRecuperados(recuperados);
                //converteo formato da data para 'dd/MM/yyyy - H:mm'
                setUpdateAt(format(parseISO(updated_at), 'dd/MM/yyyy - H:mm'));
                
            });
    }   
    // Responsável pelo grafico pizza.
    const pieData = [
        {
            value: deathsCases,
            svg: {
                fill: Colors.casosMorte
            },
            key: 1
        },
        {
            value: recoveredCases,
            svg: {
                fill: Colors.casosRecuperados
            },
            key: 2
        },
        {
            value: confirmedCases,
            svg: {
                fill: Colors.casosConfirmados
            },
            key: 3
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.updatedData}>Atualizado em: {updatedAt}</Text>
            <Text style={styles.updatedData}>Taxa de Recuperados: {taxaRecuperados}%</Text>
            <Text style={styles.updatedData}>Taxa Letalidade: {taxaLetalidade}%</Text>
            <View style={styles.chartBox}>
                <LinearGrandient style={styles.chartBox} colors={['#01ab9d', Colors.background2]}>
                    <PieChart
                        style={{
                            width: 170,
                            height: 170,
                            marginBottom: 1
                        }}
                        data={pieData}
                    />
                </LinearGrandient>
            </View>
            <View style={styles.Indicatives}>
                <View style={styles.Confirmed}>
                    <LinearGrandient style={styles.Confirmed} colors={['#71e399', Colors.casosConfirmados]}>
                        <TextInputMask
                            style={styles.IndicativeNumber}
                            type={'money'}
                            options={{
                                precision: 0,
                                separator: '.',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: '',
                            }}
                            value={confirmedCases}
                            includeRawValueInChangeText={false}
                        />
                        <Text style={styles.IndicativeTitle}>Confirmados</Text>
                    </LinearGrandient>
                </View>
                <View style={styles.Recovered}>
                    <LinearGrandient style={styles.Recovered} colors={['#8be8e1', Colors.casosRecuperados]}>
                        <TextInputMask
                            style={styles.IndicativeNumber}
                            type={'money'}
                            options={{
                                precision: 0,
                                separator: '.',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: '',
                            }}
                            value={recoveredCases}
                            includeRawValueInChangeText={false}
                        />
                        <Text style={styles.IndicativeTitle}>Curados</Text>
                    </LinearGrandient>
                </View>
            </View>
            <View style={styles.Indicatives}>
                <View style={styles.Deaths}>
                    <LinearGrandient style={styles.Deaths} colors={['#f27777', Colors.casosMorte]}>
                        <TextInputMask
                            style={styles.IndicativeNumber}
                            type={'money'}
                            options={{
                                precision: 0,
                                separator: '.',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: '',
                            }}
                            value={deathsCases}
                            includeRawValueInChangeText={false}
                        />
                        <Text style={styles.IndicativeTitle}>Mortes</Text>
                    </LinearGrandient>
                </View>
                <View style={styles.Total}>
                    <LinearGrandient style={styles.Total} colors={['#bfbbbb', Colors.casosTotal]}>
                        <TextInputMask
                            style={styles.IndicativeNumber}
                            type={'money'}
                            options={{
                                precision: 0,
                                separator: '.',
                                delimiter: '.',
                                unit: '',
                                suffixUnit: '',
                            }}
                            value={totalCases}
                            includeRawValueInChangeText={false}
                        />
                        <Text style={styles.IndicativeTitle}>Total</Text>
                    </LinearGrandient>

                </View>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background2,
        flex: 1,
        paddingTop: 3,
    },
    updatedData: {
        fontSize: 13,
        color: Colors.branco,
        marginBottom: 1,
        marginTop: 0,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#535c68',
        textAlign: 'center',
    },
    chartBox: {
        width: 300,
        height: 180,
        margin: 2,
        marginBottom: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        shadowColor: Colors.corBordas,
        shadowOpacity: 0.10,
        shadowRadius: 2.22,
        elevation: 2,
    },
    Indicatives: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Confirmed: {
        width: 145,
        height: 122,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    Recovered: {
        width: 145,
        height: 122,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    Deaths: {
        width: 145,
        height: 122,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    Total: {
        width: 145,
        height: 122,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    IndicativeNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.branco,
    },
    IndicativeTitle: {
        fontSize:16,
        color: Colors.branco,
        
    },
});