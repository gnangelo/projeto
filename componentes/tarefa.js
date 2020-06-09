import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Titulo from './titulo'


export default function Tarefa(props) {
  const [campo, setCampo] = useState(props.descricao);
  const [altera, setAltera] = useState(false);
  const confirma=()=>{
    setAltera(false);
    Keyboard.dismiss;
    props.onAltera(props.id, campo);
  }
  return (
    <View>
      {altera?(
        <View style={estilos.caixaTarefa}>
          <TextInput
            style={estilos.campo}
            defaultValue={props.descricao}
            onChangeText={(c)=>setCampo(c)}
            onSubmitEditing={confirma}
            onBlur={confirma}
            autoFocus
          />
        </View>
      ):(
        <View style={estilos.caixaTarefa}>
          <Text style={estilos.textoTarefa}>{props.descricao}</Text>
          <TouchableOpacity onPress={()=>setAltera(true)}>
            <Text style={estilos.botaoEditar}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>props.onApaga(props.id)}>
            <Text style={estilos.botaoApaga}>Apagar</Text>
          </TouchableOpacity>
        </View>
        
      )}    
     </View> 
    
  );
}
    
const estilos = StyleSheet.create({
  caixaTarefa: {
    borderBottomColor: '#306090',
    borderBottomWidth: 1,
    padding: 15,
    flexDirection:'row',
    alignItems: 'center',
  },
  textoTarefa: {
    fontSize: 20,
    flex:1,
  },
  botaoEditar:{
    padding: 10,
    color: '#ffffff',
    backgroundColor: '#0260e8',
  },
  botaoApaga:{
    padding:10,
    color: '#ffffff',
    backgroundColor: '#b40a1b',
  },
  campo:{
    fontSize:20,
    flex:1,
  },

});