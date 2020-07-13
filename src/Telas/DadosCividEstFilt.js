import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Colors from '../Estilos/Colors';
import LinearGrandient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalEstados from '../Ulteis/ModalEstados';
import { PieChart } from 'react-native-svg-charts';
import { format, parseISO } from 'date-fns';
import { TextInputMask } from 'react-native-masked-text';



const DadosCovidEstFilt = ({ navigation }) => {

    const [estado, setEstado] = useState('Selecione um Estado');
    const [uf, setUf] = useState();
    const [casos, setCasos] = useState();
    const [mortes, setMortes] = useState();
    const [suspeitos, setSuspeitos] = useState();
    const [total, setTotal] = useState();
    const [updatedAt, setUpdateAt] = useState();
    const [validador, setValidador] = useState(false);
    const [visivelEstado, setVisivelEstdo] = useState(false)

    const onEstados = item => {
        setEstado(item.state);
        setUf(item.uf);
        setCasos(item.cases);
        setMortes(item.deaths);
        setSuspeitos(item.suspects);
        setTotal(item.cases + item.deaths + item.suspects);
        setUpdateAt(format(parseISO(item.datetime), 'dd/MM/yyyy - H:mm'));
        console.log(item);
        setValidador(true);
        onClosePress();
    }
    const onClosePress = () => {
        setVisivelEstdo(false);
    }

    const onBotaoVoltar = () => {
        navigation.navigate('Home');
        setEstado('Selecione um Estado');
        setCasos();
        setMortes();
        setSuspeitos();
        setUf();
        setTotal();
        setValidador(false);
    }

    const CovidEstados = () => {
        // Responsável pelo grafico pizza.
        const pieData = [
            {
                value: mortes,
                svg: {
                    fill: Colors.casosMorte
                },
                key: 1
            },
            {
                value: suspeitos,
                svg: {
                    fill: Colors.casosRecuperados
                },
                key: 2
            },
            {
                value: casos,
                svg: {
                    fill: Colors.casosConfirmados
                },
                key: 3
            },
        ];
        return (
            <View>
                <Text style={styles.updatedData}>Atualizado em: {updatedAt}</Text>
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
                                value={casos}
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
                                value={suspeitos}
                                includeRawValueInChangeText={false}
                            />
                            <Text style={styles.IndicativeTitle}>Suspeitos</Text>
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
                                value={mortes}
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
                                value={total}
                                includeRawValueInChangeText={false}
                            />
                            <Text style={styles.IndicativeTitle}>Total</Text>
                        </LinearGrandient>

                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => setVisivelEstdo(true)} >
                    <LinearGrandient style={styles.botaoFiltro} colors={[Colors.branco, '#01ab9d', '#01ab9d']}>
                        <Image style={styles.Flag} source={{
                            uri: `https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${uf}.png`,
                        }}
                        />
                        <Text style={styles.textBotao}>{estado}</Text>
                        <Icon style={styles.icon} name='keyboard-arrow-down' size={25} color={Colors.branco} />
                    </LinearGrandient>
                </TouchableOpacity>
                <ModalEstados isVisible={visivelEstado} onConfirm={onEstados} onCancel={onClosePress} />
                {validador ? <CovidEstados state={estado} /> : null}

                {validador ? <View style={styles.boataoVoltar}>
                    <LinearGrandient style={styles.primaryButton} colors={[Colors.branco, '#01ab9d', '#01ab9d']}>
                        <TouchableOpacity onPress={onBotaoVoltar}>
                            <Text style={styles.primaryButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </LinearGrandient>
                </View> : null}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background2,
    },
    boataoVoltar: {
        paddingVertical: 10,
        backgroundColor: Colors.background2,
    },
    botaoFiltro: {
        width: 300,
        height: 45,
        borderWidth: 1,
        borderColor: Colors.corBordas,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    Flag: {
        width: 45,
        height: 35,
        borderRadius: 5,
        marginLeft: 15,       
    },
    textBotao: {
        color: Colors.branco,
        fontSize: 18,
        fontWeight: 'bold',
       
    },
    icon: {
        marginTop: 8,
        alignItems:'center',
        marginRight:20,
        marginTop:3
    },
    primaryButton: {
        width: 300,
        height: 45,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.corBordas,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    primaryButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.branco,
    },
    chartBox: {
        width: 300,
        height: 180,
        margin: 5,
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
    updatedData: {
        fontSize: 13,
        color: Colors.branco,
        marginBottom: 1,
        marginTop: 0,
        textAlign: 'center',
    },
    IndicativeNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.branco,
    },
    IndicativeTitle: {
        fontSize: 16,
        color: Colors.branco,

    },
    
})

export default DadosCovidEstFilt;