
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConfigurationTela from '../Telas/ConfigurationTela';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConfigStack = createStackNavigator();

const ConfigurationTab = ({ navigation }) => {
  return (
    <ConfigStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <ConfigStack.Screen name='Configuration' component={ConfigurationTela}
        options={{
          title: 'Configuração',
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



export default ConfigurationTab;