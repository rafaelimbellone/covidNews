import  React from 'react';
import { View, Text, Button, StyleSheet,  } from 'react-native';
const ConfigurationTela = ({ navigation }) =>{
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
         <Text>Configuration screem</Text>
         <Button style = {styles.Button} title='Click Here' 
                 onPress={() => navigation.navigate('Home')}/>
      </View> 
    )
  }
  const styles = StyleSheet.create({
    Button:{
      margin:10,
      
    }
  })
  export default ConfigurationTela;