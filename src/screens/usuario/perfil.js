import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  InteractionManager,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PratoPerfil from '~/src/components/PratoPerfil';
import pratoActions from '~/src/redux/actions/PratoActionCreator';
import usuarioActions from '~/src/redux/actions/UsuarioActionCreator';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { H4, H5 } from '~/src/styled-components/Texto';
import { ScrollWrapperCenter, WrapperCenter, Wrapper } from '~/src/styled-components/Wrapper';
import AsyncStorage from '~/src/util/AsyncStorage';

export default (props) => {
  const [loading, setLoading] = useState(false);
  const {
    nome, email, foto, pratos, erro, sucesso
  } = useSelector((state) => state.UsuarioReducer);
  const dispatch = useDispatch();

  useEffect(async () => {
    InteractionManager.runAfterInteractions(async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        props.navigation.navigate('Home');
      } else {
        setLoading(true);
        await dispatch(usuarioActions.getUsuario());
        setLoading(false);
      }
    });
  }, []);

  function excluir(id) {
    Alert.alert(
      'Atenção',
      'Deseja mesmo excluir esse prato?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => dispatch(pratoActions.delete(id)) },
      ],
      { cancelable: true }
    );
  }

  return (
    <ScrollWrapperCenter>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d3f72" />
        </View>
      ) : (
        <Wrapper>
          <WrapperCenter style={styles.bgColor}>
            <View style={styles.avatarContainer}>
              <Image style={styles.Img} source={{ uri: foto }} />
            </View>
            <H4 style={styles.colorNome}>{nome}</H4>
            <H5 style={styles.colorEmail}>{email}</H5>
            <Botao
              style={styles.btnAlterarDados}
              onPress={() => props.navigation.navigate('AlterarDados')}
            >
              <BotaoTexto style={styles.btnAlterarDadosText}>Alterar dados</BotaoTexto>
            </Botao>
            <Botao
              style={styles.btnSair}
              onPress={async () => {
                await AsyncStorage.removeItem('token');
                props.navigation.navigate('Home');
              }}
            >
              <BotaoTexto style={styles.paddingY10}>Sair</BotaoTexto>
            </Botao>
            <H5 style={styles.redText}>{erro}</H5>
            <H5 style={styles.greenText}>{sucesso}</H5>
          </WrapperCenter>
          <Wrapper style={styles.bgColorSecundary}>
            <H4 style={styles.label}>
              Meus pratos({pratos.length}):
            </H4>
            {pratos.map((prato) => (
              <PratoPerfil
                key={prato.Id}
                id={prato.Id}
                nome={prato.Nome}
                data={prato.DataCriacao}
                navegar={props.navigation.navigate}
                editar={props.navigation.navigate}
                excluir={excluir}
              />
            ))}
          </Wrapper>
        </Wrapper>
      )}
    </ScrollWrapperCenter>
  );
};

const styles = StyleSheet.create({
  ImgContainer: {
    height: 208,
    width: 208,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#184890',
  },
  Img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  loadingContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#305c9b',
  },
  bgColor: { backgroundColor: '#305c9b' },
  bgColorSecundary: { backgroundColor: '#184890' },
  colorNome: { color: '#FFF' },
  colorEmail: { color: '#D5D5D5' },
  btnAlterarDados: { backgroundColor: '#184890', borderWidth: 0 },
  btnAlterarDadosText: { padding: 10, width: 120 },
  btnSair: {
    backgroundColor: '#8e0000',
    borderWidth: 1,
    borderColor: '#630000',
    minWidth: 80,
    height: 25,
  },
  paddingY10: { paddingHorizontal: 10 },
  redText: { color: 'red' },
  greenText: { color: 'lightgreen' },
  label: {
    backgroundColor: '#305c9b',
    color: '#FFF',
    textAlign: 'left',
    padding: 5,
  },
  avatarContainer: {
    height: 208,
    width: 208,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#184890',
    marginTop: 10,
  },
});
