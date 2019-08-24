import React, { Component } from 'react';
import {
  View, StyleSheet, ActivityIndicator, Image, InteractionManager
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import actions from '../../redux/actions/UsuarioActionCreator';
import { Botao, BotaoTexto } from '../../styled-components/Botao';
import { Input } from '../../styled-components/Input';
import { H4, H5 } from '../../styled-components/Texto';
import { ScrollWrapperCenter, Wrapper } from '../../styled-components/Wrapper';

class AlterarDados extends Component {
  state = {
    nome: '',
    senha: '',
    foto: null,
    fotoDisplay: null,
    fotoNome: 'camera',
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ nome: this.props.nome });
    });
  }

  imagePicker() {
    const options = {
      title: 'Escolha uma opção',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        const source = `data:image/jpeg;base64,${response.data}`;
        const displaySource = response.uri;

        this.setState({
          foto: source,
          fotoDisplay: displaySource,
          fotoNome: response.fileName
            .split('.')
            .slice(0, -1)
            .join('.'),
        });
      }
    });
  }

  render() {
    return (
      <Wrapper>
        {this.props.loading ? (
          <View
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#1d3f72" />
          </View>
        ) : (
          <ScrollWrapperCenter>
            <View style={{ ...styles.ImgContainer, marginTop: 10 }}>
              <Image style={styles.Img} source={{ uri: this.props.foto }} />
            </View>
            <H5 style={{ color: 'red' }}>{this.props.erro}</H5>
            <H5 style={{ color: 'green' }}>{this.props.sucesso}</H5>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <H4 style={{ textAlign: 'left', color: '#0d2b56', width: '100%' }}>Nome:</H4>
              <Input
                onChangeText={(nome) => this.setState({ nome })}
                value={this.state.nome}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.senha.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <H4 style={{ textAlign: 'left', color: '#0d2b56', width: '100%' }}>Senha:</H4>
              <Input
                onChangeText={(senha) => this.setState({ senha })}
                value={this.state.senha}
                returnKeyType="next"
                ref={(ref) => {
                  this.senha = ref;
                }}
                onSubmitEditing={() => this.props.onAlterarDados(
                  this.state.nome,
                  this.state.senha,
                  this.state.foto,
                  this.state.fotoNome
                )}
                blurOnSubmit={false}
                secureTextEntry
              />
            </View>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <H4 style={{ textAlign: 'left', color: '#0d2b56', width: '100%' }}>Foto:</H4>
              <Botao style={{ width: 180 }} onPress={() => this.imagePicker()}>
                <BotaoTexto>Escolher imagem...</BotaoTexto>
              </Botao>
              {this.state.fotoDisplay && (
                <FastImage
                  style={{
                    width: '100%',
                    height: 300,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={{ uri: this.state.fotoDisplay }}
                />
              )}
            </View>
            <Botao
              style={{ marginBottom: 10, marginTop: 20 }}
              onPress={() => this.props.onAlterarDados(
                this.state.nome,
                this.state.senha,
                this.state.foto,
                this.state.fotoNome
              )}
            >
              <BotaoTexto>Atualizar</BotaoTexto>
            </Botao>
          </ScrollWrapperCenter>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.UsuarioReducer.nome,
  foto: state.UsuarioReducer.foto,
  erro: state.UsuarioReducer.erro,
  sucesso: state.UsuarioReducer.sucesso,
  loading: state.UsuarioReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onAlterarDados(nome, senha, foto, fotoNome) {
    dispatch(actions.updateUsuario(nome, senha, foto, fotoNome));
  },
});

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlterarDados);
