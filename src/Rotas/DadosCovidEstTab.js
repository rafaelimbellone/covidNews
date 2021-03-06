
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DadosCovidEst from '../Telas/DadosCovidEst';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Estilos/Colors';


const ConfigStack = createStackNavigator();

const DadosCovidEstTab = ({ navigation }) => {
  return (
    <ConfigStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387'
      },
      headerTintColor: Colors.branco,
            headerTitleStyle: {
                fontSize: 24,
                margin: 26
            }
    }}>
      <ConfigStack.Screen name='DadosCovidEst' component={DadosCovidEst}
        options={{
          title: 'Covid19 - Estados',
          headerLeft: () => (
            <Icon.Button name="reorder" size={25}
              backgroundColor='#009387'
              onPress={() => {
                navigation.openDrawer()
              }}
            ></Icon.Button>
          )
        }} />

    </ConfigStack.Navigator>
  )
}



export default DadosCovidEstTab;