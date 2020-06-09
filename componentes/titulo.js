import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';



export default function Titulo(props) {
    return (
        <View style={estilos.titulo}>
            <Text style={estilos.tituloTexto}>{props.children}</Text>
        </View>
    );
}
    


const estilos = StyleSheet.create({
    titulo: {
        borderBottomColor: '#306090',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 25,
        backgroundColor: '#e0e0e0',
      },
      tituloTexto: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
      },
});