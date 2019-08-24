import { Formik } from 'formik';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { Input } from '~/src/styled-components/Input';
import { H4, H5 } from '~/src/styled-components/Texto';

import styles from './styles'

const LoginForm = (props) => {
  let senhaInput = null;

  function focusSenha() {
    senhaInput.focus();
  }

  return (
    <Formik
      initialValues={{ email: '', senha: '' }}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <View style={styles.container}>
          {props.isSubmitting ? (
            <ActivityIndicator size="large" color="#1d3f72" />
          ) : (
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <H4 style={styles.label}>Email:</H4>
                <Input
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  returnKeyType="next"
                  onSubmitEditing={focusSenha}
                  blurOnSubmit={false}
                />
                <H5 style={styles.inputErro}>{props.errors.email}</H5>
              </View>
              <View style={styles.inputContainer}>
                <H4 style={styles.label}>Senha:</H4>
                <Input
                  onChangeText={props.handleChange('senha')}
                  value={props.values.senha}
                  returnKeyType="next"
                  ref={(ref) => {
                    senhaInput = ref;
                  }}
                  onSubmitEditing={props.handleSubmit}
                  blurOnSubmit={false}
                  secureTextEntry
                />
                <H5 style={styles.inputErro}>{props.errors.senha}</H5>
              </View>

              <Botao style={styles.btn} onPress={props.handleSubmit}>
                <BotaoTexto>Login</BotaoTexto>
              </Botao>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Campo obrigatório')
    .email('Informe um email válido'),
  senha: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
});

export default LoginForm;
