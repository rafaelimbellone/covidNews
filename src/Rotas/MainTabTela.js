
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTela from '../Telas/Home';
import ConfigurationTela from '../Telas/ConfigurationTela';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Estilos/Colors';

const HomeStack = createStackNavigator();
// Responsavel pela navegação Stack.
const MainTabTela = ({ navigation }) => {
  return (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.background2,
      },
      headerTintColor: Colors.branco,
      headerTitleStyle: {
        fontSize: 24,
        margin: 28,
      }
    }}>
      <HomeStack.Screen name='Home' component={HomeTela}
        options={{
          title: 'Covid19 Notícias',
          headerLeft: () => (
            <Icon.Button name="reorder" size={25}
              backgroundColor={Colors.background2}
              onPress={() => {
                navigation.openDrawer()
              }}
            ></Icon.Button>
          )
        }} />

    </HomeStack.Navigator>
  )
}
export default MainTabTela;