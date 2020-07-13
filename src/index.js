import React from 'react';
import {YellowBox, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from './Rotas/DrawerContent';
import MainTabTela from './Rotas/MainTabTela';
import ConfigurationTab from './Rotas/ConfigurationTab';
import DadosCovidBrTab from './Rotas/DadosCovidBrTab';
import DadosCovidEstTab from './Rotas/DadosCovidEstTab';
import DadosCovidEstTabFilt from './Rotas/DadosCovidEstTabFilter'
import Colors from './Estilos/Colors';
// Excluir os alertas Warner.
YellowBox.ignoreWarnings([
    'Require cicles',
    'Each child'
 ]);

// Define a cor do StatusBar
StatusBar.setBackgroundColor(Colors.background2);
// Define a cor dos icones como relogio. bateria, wifi acima da statusBar.
StatusBar.setBarStyle("content");

const Drawer = createDrawerNavigator();

// Resposnsável pela Navegação do app.
const App = () => {
    return (       
         <NavigationContainer>
            <Drawer.Navigator drawerContent = { props => <DrawerContent {...props}/>}>
                <Drawer.Screen name="Home" component={MainTabTela}  />
                <Drawer.Screen name="DadosCovidBr" component={DadosCovidBrTab}/>
                <Drawer.Screen name="DadosCovidEst" component={DadosCovidEstTab} />
                <Drawer.Screen name="DadosCovidEstFilt" component={DadosCovidEstTabFilt}/>
                <Drawer.Screen name="Configuration" component={ConfigurationTab}/>                      
            </Drawer.Navigator>
         </NavigationContainer> 
    )
};
export default App;