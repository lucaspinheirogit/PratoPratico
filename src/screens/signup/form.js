import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import * as Yup from 'yup';

import { Botao, BotaoTexto } from '~/src/styled-components/Botao';
import { Input } from '~/src/styled-components/Input';
import { H4, H5 } from '~/src/styled-components/Texto';

import styles from './styles'

const LoginForm = (props) => {
  const [image, setImage] = useState(null);

  let emailInput = null;
  let senhaInput = null;

  function focusEmail() {
    emailInput.focus();
  }

  function focusSenha() {
    senhaInput.focus();
  }

  function imagePicker() {
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
        setImage(response);
      }
    });
  }

  return (
    <Formik
      initialValues={{
        nome: '',
        email: '',
        senha: '',
      }}
      onSubmit={(values, { setSubmitting }) => props.onSubmit({ ...values, image }, setSubmitting)}
      validationSchema={validationSchema}
    >
      {(props) => (
        <View style={styles.container}>
          {props.isSubmitting ? (
            <ActivityIndicator size="large" color="#1d3f72" />
          ) : (
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <H4 style={styles.label}>Nome:</H4>
                <Input
                  onChangeText={props.handleChange('nome')}
                  value={props.values.nome}
                  returnKeyType="next"
                  onSubmitEditing={focusEmail}
                  blurOnSubmit={false}
                />
                <H5 style={styles.inputErro}>{props.errors.nome}</H5>
              </View>
              <View style={styles.inputContainer}>
                <H4 style={styles.label}>Email:</H4>
                <Input
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  returnKeyType="next"
                  ref={(ref) => {
                    emailInput = ref;
                  }}
                  onSubmitEditing={focusSenha}
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  keyboardType="email-address"
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
              <View style={styles.inputContainer}>
                <H4 style={styles.label}>Foto:</H4>
                <Botao style={styles.btnImagePicker} onPress={imagePicker}>
                  <BotaoTexto>Escolher imagem...</BotaoTexto>
                </Botao>
                {image && (
                  <FastImage
                    style={{
                      width: '100%',
                      height: 300,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                    source={{ uri: image.uri }}
                  />
                )}
              </View>

              <Botao style={styles.btn} onPress={props.handleSubmit}>
                <BotaoTexto>Cadastrar</BotaoTexto>
              </Botao>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .required('Campo obrigatório')
    .email('Informe um email válido'),
  senha: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
});

export default LoginForm;
