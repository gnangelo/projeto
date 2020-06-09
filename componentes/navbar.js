import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';



export default function NavBar({ estado }) {
    return (
      <View style={estilos.navbar}>
        <Text style={estilos.navbarText}>Lista de Compras</Text>
        <Text style={estilos.navbarSmallText}>{estado}</Text>
      </View>
    );
  }

const estilos = StyleSheet.create({
    navbar: {
        backgroundColor: '#306090',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      },
      navbarText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
      },
      navbarSmallText: {
        color: 'white',
        fontSize: 15,
      },
});
  