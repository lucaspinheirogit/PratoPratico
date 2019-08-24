import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import Usuario from '../../img/usuario.png';
import actions from '../../redux/actions/UsuarioActionCreator';
import { Botao, BotaoTexto } from '../../styled-components/Botao';
import { Input } from '../../styled-components/Input';
import { H4, H5 } from '../../styled-components/Texto';
import { ScrollWrapperCenter, Wrapper } from '../../styled-components/Wrapper';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    senha: '',
    foto: null,
    fotoDisplay: null,
    fotoNome: 'camera',
  };

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
      // if (response.didCancel) {
      //   console.log('User cancelled image picker');
      // } else if (response.error) {
      //   console.log('ImagePicker Error: ', response.error);
      // } else {
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
            <FastImage style={{ width: 185, height: 185 }} source={Usuario} />
            <H5 style={{ color: 'red' }}>{this.props.erro}</H5>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <H4 style={{ textAlign: 'left', color: '#0d2b56', width: '100%' }}>Nome:</H4>
              <Input
                onChangeText={(nome) => this.setState({ nome })}
                value={this.props.nome}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.email.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <H4 style={{ textAlign: 'left', color: '#0d2b56', width: '100%' }}>Email:</H4>
              <Input
                onChangeText={(email) => this.setState({ email })}
                value={this.props.email}
                returnKeyType="next"
                ref={(ref) => {
                  this.email = ref;
                }}
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
                value={this.props.senha}
                returnKeyType="next"
                ref={(ref) => {
                  this.senha = ref;
                }}
                onSubmitEditing={() => this.props.onSignup(
                  this.state.nome,
                  this.state.email,
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
              style={{ marginBottom: 10, marginTop: 20, width: 120 }}
              onPress={() => this.props.onSignup(
                this.state.nome,
                this.state.email,
                this.state.senha,
                this.state.foto,
                this.state.fotoNome
              )}
            >
              <BotaoTexto>Cadastrar</BotaoTexto>
            </Botao>
          </ScrollWrapperCenter>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  erro: state.UsuarioReducer.erro,
  loading: state.UsuarioReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onSignup(nome, email, senha, foto, fotoNome) {
    dispatch(actions.signup(nome, email, senha, foto, fotoNome));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
