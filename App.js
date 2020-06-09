import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, Button, Keyboard, AsyncStorage, Alert, Text, TouchableOpacity } 
from 'react-native';
import Constants from 'expo-constants';
import NavBar from './componentes/navbar'
import Tarefas from './componentes/tarefas'
import * as LocalAuthentication from 'expo-local-authentication'


export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [campo, setCampo] = useState('');
  const [compativel, setCompativel] = useState(false);
  const [auticavel, setAutenticavel] = useState(false);
  const [auticado, setAutenticado] = useState(false);
  let _input;

  const autenticar = async ()=>{
    let aut = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autorize o acesso!'
    });
    if( aut.success) setAutenticado(true);
  }


  const armazenaDados= async()=>{
    try{
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    } catch (e) {
      Alert.alert('Os dados não foram armazenados!');
    }
  };

  const recuperaDados = async() => {
    try{
      const t = await AsyncStorage.getItem('tarefas');
      if(t!==null){
        setTarefas(JSON.parse(t));
      }
    } catch(e){
      Alert.alert('Os dados não foram armazenados!');
    }
  };

  const verificaCompatibilidade = async ()=>{
    try{
      const comp = await LocalAuthentication.hasHardwareAsync();
      if(comp) setCompativel(true);
      const aut = await LocalAuthentication.isEnrolledAsync();
      if(aut) setAutenticavel(true);
    }catch (e){
      Alert.alert('Usuario não Autenticado!')
    }
  }

  useEffect(()=>{
    recuperaDados();
    verificaCompatibilidade();
  }, []);

  useEffect(()=>{
    armazenaDados();
  }, [tarefas]);

  const adicionaTarefa = (t) =>{
    if(t.length>0){
      const novaTarefa = {
        id: Math.random().toString(),
        descricao: t,
      }
      setTarefas( [...tarefas, novaTarefa]);
      setCampo('');
      _input.blur();
    }
  }

  const alteraTarefa = (id, d) =>{
    const i = tarefas.findIndex((t) => t.id===id);
    let novaLista = [...tarefas];
    novaLista[i].descricao =d;
    setTarefas(novaLista);
  }

  const apagaTarefa = (id) => {
    setTarefas(tarefas.filter((t)=> t.id!==id))
  }

  return !compativel || !auticavel || !auticado ?(
    <KeyboardAvoidingView 
    behavior={Platform.OS == 'ios'? 'padding':'height'}
    style={estilos.app}>
      <View style={estilos.conteudo}>
        <NavBar estado={tarefas.length + ' Produtos na cesta'} />
        <Tarefas 
          lista={tarefas} 
          onAltera={alteraTarefa} 
          onApaga={apagaTarefa}
        />
        
        <View style={estilos.caixaCampo}>
          <TextInput 
          style={estilos.campo}
          placeholder={"Novo produto"}
          defaultValue={campo}
          onChangeText={(campo)=>setCampo(campo)}
          onSubmitEditing={()=>adicionaTarefa(campo)}
          onBlur={Keyboard.dismiss}
          ref={(r)=> _input = r}
          />
          <Button 
          onPress={()=> adicionaTarefa(campo)}
          title="Adicionar"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
    ):(
      <View style={estilos.login}>
      <Text style={estilos.loginTexto}>Lista de Compras 1.0</Text>
      <TouchableOpacity style={estilos.loginBotao} onPress={autenticar}>
        <Text style={estilos.loginBotaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const estilos = StyleSheet.create({
  app: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#306090',
  },
  conteudo: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  caixaCampo:{
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
  },
  campo:{
    borderWidth:1,
    padding:10,
    fontSize: 20,
    flex:1,
  },
  login: {
    backgroundColor: '#306090',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginTexto: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  loginBotao: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#D0D0D0',
    padding: 15,
    width: 200,
  },
  loginBotaoTexto: {
    textAlign: 'center',
    fontSize: 20,
  },
});
