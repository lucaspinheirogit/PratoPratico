import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';

import PratoPerfil from '~/src/components/PratoPerfil';
import pratoActions from '~/src/redux/actions/PratoActionCreator';
import usuarioActions from '~/src/redux/actions/UsuarioActionCreator';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { H4, H5 } from '~/src/styled-components/Texto';
import { ScrollWrapperCenter, WrapperCenter, Wrapper } from '~/src/styled-components/Wrapper';
import AsyncStorage from '~/src/util/AsyncStorage';

class Perfil extends Component {
  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.onGetUsuario();
      }
    });
  }

  excluir = (id) => {
    Alert.alert(
      'Atenção',
      'Deseja mesmo excluir esse prato?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => this.props.onExcluir(id) },
      ],
      { cancelable: true }
    );
  };

  render() {
    const {
      nome, email, foto, loading
    } = this.props;
    return (
      <ScrollWrapperCenter>
        {loading ? (
          <View
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#305c9b',
            }}
          >
            <ActivityIndicator size="large" color="#1d3f72" />
          </View>
        ) : (
          <Wrapper>
            <WrapperCenter style={{ backgroundColor: '#305c9b' }}>
              <View style={{ ...styles.ImgContainer, marginTop: 10 }}>
                <Image style={styles.Img} source={{ uri: foto }} />
              </View>
              <H4 style={{ color: '#FFF' }}>{nome}</H4>
              <H5 style={{ color: '#D5D5D5' }}>{email}</H5>
              <Botao
                style={{ backgroundColor: '#184890', borderWidth: 0 }}
                onPress={() => this.props.navigation.navigate('AlterarDados')}
              >
                <BotaoTexto style={{ padding: 10, width: 120 }}>Alterar dados</BotaoTexto>
              </Botao>
              <Botao
                style={{
                  backgroundColor: '#8e0000',
                  borderWidth: 1,
                  borderColor: '#630000',
                  minWidth: 80,
                  height: 25,
                }}
                onPress={async () => {
                  await AsyncStorage.removeItem('token');
                  this.props.navigation.navigate('Home');
                }}
              >
                <BotaoTexto style={{ paddingHorizontal: 10 }}>Sair</BotaoTexto>
              </Botao>
              <H5 style={{ color: 'red' }}>{this.props.erro}</H5>
              <H5 style={{ color: 'lightgreen' }}>{this.props.sucesso}</H5>
            </WrapperCenter>
            <Wrapper style={{ backgroundColor: '#184890' }}>
              <H4
                style={{
                  backgroundColor: '#305c9b',
                  color: '#FFF',
                  textAlign: 'left',
                  padding: 5,
                }}
              >
                Meus pratos(
                {this.props.pratos ? this.props.pratos.length : ''}
                ):
              </H4>
              {this.props.pratos.map(prato => (
                <PratoPerfil
                  key={prato.Id}
                  id={prato.Id}
                  nome={prato.Nome}
                  data={prato.DataCriacao}
                  navegar={this.props.navigation.navigate}
                  editar={this.props.navigation.navigate}
                  excluir={this.excluir}
                />
              ))}
            </Wrapper>
          </Wrapper>
        )}
      </ScrollWrapperCenter>
    );
  }
}

const mapStateToProps = state => ({
  nome: state.UsuarioReducer.nome,
  email: state.UsuarioReducer.email,
  foto: state.UsuarioReducer.foto,
  pratos: state.UsuarioReducer.pratos,
  loading: state.UsuarioReducer.loading,
  erro: state.UsuarioReducer.erro,
  sucesso: state.UsuarioReducer.sucesso,
});

const mapDispatchToProps = dispatch => ({
  onGetUsuario() {
    dispatch(usuarioActions.getUsuario());
  },
  onExcluir(id) {
    dispatch(pratoActions.delete(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Perfil);

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
});
