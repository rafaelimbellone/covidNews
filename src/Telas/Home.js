import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import logo from '../Assets/virus.png';
import LinearGrandient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native'
import mascara from '../Assets/tapa-boca.png';
import lavarMaos from '../Assets/prevencao.png';
import aglomeracao from '../Assets/coronavirus.png';
import febre from '../Assets/febre.png';
import pulmao from '../Assets/pulmao.png';
import gripe from '../Assets/gripe.png';
import Colors from '../Estilos/Colors';

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>SINTOMAS</Text>
        <View style={styles.grid} >
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.gridImageHeader}>
              <Image style={styles.gridImageIcone} source={febre} />
            </TouchableOpacity>
            <Text style={styles.viewImageTextHeader}>Febre</Text>
          </View>
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.gridImageHeader}>
              <Image style={styles.gridImageIcone} source={pulmao} />
            </TouchableOpacity>
            <Text style={styles.viewImageTextHeader}>Falta de Ar</Text>
          </View>
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.gridImageHeader}>
              <Image style={styles.gridImageIcone} source={gripe} />
            </TouchableOpacity>
            <Text style={styles.viewImageTextHeader}>Gripe</Text>
          </View>
        </View>
      </View>
      <Animatable.View animation='fadeInUpBig' duration={1500} style={styles.footer}>
        <Text style={styles.title}>PREVENÇÃO</Text>
        <View style={styles.grid} >
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.gridImage}>
              <Image style={styles.gridImageIcone} source={lavarMaos} />
            </TouchableOpacity>
            <Text style={styles.viewImageText}>Lavar as Mãos</Text>
          </View>
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.gridImage}>
              <Image style={styles.gridImageIcone} source={mascara} />
            </TouchableOpacity>
            <Text style={styles.viewImageText}>Máscara</Text>
          </View>
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.gridImage}>
              <Image style={styles.gridImageIcone} source={aglomeracao} />
            </TouchableOpacity>
            <Text style={styles.viewImageText}>Aglomerações</Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('DadosCovidBr')}>
            <LinearGrandient style={styles.dadosCovid} colors={['#01ab9d', Colors.background2]}>
              <Text style={styles.textSign}>Dados Covid</Text>
              <MaterialIcons name='navigate-next' color='#fff' size={20} />
            </LinearGrandient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
  },
  header: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.branco,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dfe6e9',
    paddingVertical: 30,
    paddingHorizontal: 30,

  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  titleHeader: {
    color: Colors.branco,
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    marginTop: -12,
    marginLeft: -18,
    color: Colors.Texto,
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  viewImage: {
    alignItems: 'center',
    marginTop: 10,
  },
  viewImageText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.Texto,
  },
  viewImageTextHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.branco,
  },
  grid: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 2,
  },
  gridImage: {
    backgroundColor: Colors.branco,
    width: 108,
    height: 108,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.corBordas,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  gridImageHeader: {
    backgroundColor: Colors.background2,
    width: 108,
    height: 108,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.corBordas,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  gridImageIcone: {
    width: 90,
    height: 95,
  },
  dadosCovid: {
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: Colors.branco,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Home;