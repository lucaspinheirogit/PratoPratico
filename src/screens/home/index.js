import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

import Logo from '~/src/img/logo.png';
import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { H6 } from '~/src/styled-components/Texto';
import { ScrollWrapperCenter } from '~/src/styled-components/Wrapper';

import styles from './styles';

export default (props) => (
  <ScrollWrapperCenter>
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('TabNavigator')}>
      <View style={styles.logoContainer}>
        <FastImage style={styles.logo} source={Logo} />
      </View>
    </TouchableWithoutFeedback>
    <View style={styles.loginView}>
      <Botao style={styles.btnLogin} onPress={() => props.navigation.navigate('Login')}>
        <BotaoTexto>Login</BotaoTexto>
      </Botao>
      <H6 style={styles.message}>Não possui uma conta? Cadastre-se gratuitamente!</H6>
      <Botao onPress={() => props.navigation.navigate('Signup')}>
        <BotaoTexto>Cadastrar-se</BotaoTexto>
      </Botao>
    </View>
  </ScrollWrapperCenter>
);
