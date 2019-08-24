import React from 'react';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';

import Usuario from '../../img/usuario.png';
import actions from '~/src/redux/actions/UsuarioActionCreator';
import { H5 } from '../../styled-components/Texto';
import { WrapperCenter, ScrollWrapper } from '../../styled-components/Wrapper';

import Form from './form';

const Signup = () => {
  const dispatch = useDispatch();
  const erro = useSelector((state) => state.UsuarioReducer.erro);

  async function handleSubmit(values, setSubmitting) {
    const {
      nome, email, senha, image
    } = values;
    await dispatch(actions.signup(nome, email, senha, image, `${nome}-profilePicture`));
    setSubmitting(false);
  }

  return (
    <ScrollWrapper>
      <WrapperCenter>
        <FastImage style={{ width: 200, height: 200 }} source={Usuario} />
        <H5 style={{ color: 'red' }}>{erro}</H5>
      </WrapperCenter>
      <Form onSubmit={handleSubmit} />
    </ScrollWrapper>
  );
};

export default Signup;
