import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import Titulo from './titulo'
import Tarefa from './tarefa';


export default function Tarefas(props) {
  return (
      
    <FlatList
      data={props.lista}

      
      renderItem={({item}) =>(
        <Tarefa 
          id={item.id} 
          descricao={item.descricao}
          onAltera={props.onAltera}
          onApaga={props.onApaga}
        />
      )}
      keyExtrator={(item) => item.id}
      ListHeaderComponent={()=> <Titulo>Minas Compras</Titulo>}
    />
  );
}
    
const estilos = StyleSheet.create({
    
});