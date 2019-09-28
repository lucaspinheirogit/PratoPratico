import React from 'react';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';

import Form from './form';
import Usuario from '~/src/img/usuario.png';
import actions from '~/src/redux/actions/UsuarioActionCreator';
import { H5 } from '~/src/styled-components/Texto';
import { ScrollWrapperCenter } from '~/src/styled-components/Wrapper';

import styles from './styles'

const Signup = () => {
  const dispatch = useDispatch();
  const erro = useSelector((state) => state.UsuarioReducer.erro);

  async function handleSubmit(values, setSubmitting) {
    const {
      nome, email, senha, image
    } = values;
    await dispatch(actions.signup(nome, email, senha, image));
    setSubmitting(false);
  }

  return (
    <ScrollWrapperCenter>
      <FastImage style={styles.logo} source={Usuario} />
      {erro !== '' && <H5 style={styles.erro}>{erro}</H5>}
      <Form onSubmit={handleSubmit} />
    </ScrollWrapperCenter>
  );
};

export default Signup;
