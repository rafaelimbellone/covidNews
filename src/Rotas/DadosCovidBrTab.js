
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DadosCovidBr from '../Telas/DadosCovidBr';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Estilos/Colors';

const ConfigStack = createStackNavigator();

const DadosCovidBrTab = ({ navigation }) => {
    return (
        <ConfigStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.background2,
            },
            headerTintColor: Colors.branco,
            headerTitleStyle: {
                fontSize: 24,
                margin: 26
            }
        }}>
            <ConfigStack.Screen name='DadosCovidBr' component={DadosCovidBr}
                options={{
                    title: 'Convid19 - Brasil',
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



export default DadosCovidBrTab;