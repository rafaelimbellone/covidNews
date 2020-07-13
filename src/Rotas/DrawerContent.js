import React, { useState, useContext } from 'react';

import { View, StyleSheet, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
}
    from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import userImage from '../Assets/virus.png';
import Colors from '../Estilos/Colors';


// Responsavel pela navegação Drawer.
export function DrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} style={styles.drawerContent} >
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.userInfoSelection}>
                        <View style={styles.viewLogo}>
                            <Image style={styles.logo} source={userImage} />
                            <View style={{ marginLeft: 8, marginTop: 15 }}>
                                <Title style={styles.title}>Covid19 Notícias</Title>
                                <Caption style={styles.caption}>Dados do Brasil e</Caption>
                                <Caption style={styles.caption}>Estados.</Caption>
                            </View>
                        </View>

                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection} >
                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon name='home' color={Colors.branco} size={32} />
                                )}
                                labelStyle={{
                                    color: Colors.branco,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                                label='Início'
                                onPress={() => { props.navigation.navigate('Home') }}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon name='show-chart' color={Colors.branco} size={32} />
                                )}
                                labelStyle={{
                                    color: Colors.branco,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                                label='Dados Brasil'
                                onPress={() => { props.navigation.navigate('DadosCovidBr') }}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon name='data-usage' color={Colors.branco} size={32} />
                                )}
                                labelStyle={{
                                    color: Colors.branco,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                                label='Dados Estados'
                                onPress={() => { props.navigation.navigate('DadosCovidEst') }}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon name='filter-list'color={Colors.branco} size={32} />
                                )}
                                labelStyle={{
                                    color: Colors.branco,
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                }}
                                label='Dados Estados Filtro'
                                onPress={() => { props.navigation.navigate('DadosCovidEstFilt') }}
                            />
                        </Drawer.Section>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name='help-outline' color={Colors.branco} size={32} />
                            )}
                            labelStyle={{
                                color: Colors.branco,
                                fontSize: 17,
                                fontWeight: 'bold',
                            }}
                            label='Ajuda'
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                    <View style={styles.preference}>
                        <Text style={styles.preferenceTextInfo}>Informações</Text>
                        <Text style={styles.preferenceTextDesc}>Desenvolvido por ImbelloneApp.</Text>
                        <Text style={styles.preferenceTextDesc}>comercial@imbelloneApp.com.br.</Text>
                        <Text style={styles.preferenceTextDesc}> Api do Ministério da Saúde. </Text>
                        <Text style={styles.preferenceText}>Versão 1.0</Text>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: Colors.background2,
    },
    userInfoSelection: {
        marginTop: 6,
        paddingLeft: 20,
    },
    viewLogo: {
        flexDirection: 'row',

    },
    logo: {
        height: 96,
        width: 96,
    },
    title: {
        fontSize: 18,
        marginTop: 3,
        fontWeight: 'bold',
        color: Colors.branco,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: Colors.branco,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 29,
    },
    paragrapf: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        marginTop: 30,
    },
    preferenceTextInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.branco
    },
    preferenceTextDesc: {
        fontSize: 14,
        color: Colors.branco
    },
    preferenceText: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.branco
    },

});