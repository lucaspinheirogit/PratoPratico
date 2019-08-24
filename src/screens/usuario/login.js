import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
    email: '',
    senha: '',
  };

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
            <FastImage style={{ width: 200, height: 200 }} source={Usuario} />
            <H5 style={{ color: 'red' }}>{this.props.erro}</H5>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <H4 style={{ textAlign: 'left', color: '#0d2b56', width: '100%' }}>Email:</H4>
              <Input
                onChangeText={(email) => this.setState({ email })}
                value={this.props.email}
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
                value={this.props.senha}
                returnKeyType="next"
                ref={(ref) => {
                  this.senha = ref;
                }}
                onSubmitEditing={() => this.props.onLogin(this.state.email, this.state.senha)}
                blurOnSubmit={false}
                secureTextEntry
              />
            </View>
            <Botao
              style={{ width: 80 }}
              onPress={() => this.props.onLogin(this.state.email, this.state.senha)}
            >
              <BotaoTexto>Login</BotaoTexto>
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
  onLogin(email, senha) {
    dispatch(actions.login(email, senha));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
