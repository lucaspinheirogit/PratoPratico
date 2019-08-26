import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'

import Form from './form'
import actions from '~/src/redux/actions/UsuarioActionCreator'
import { H5 } from '~/src/styled-components/Texto'
import { ScrollWrapperCenter } from '~/src/styled-components/Wrapper'

import styles from './styles'

const Login = () => {
  const dispatch = useDispatch()
  const { foto: avatar, erro, sucesso } = useSelector(state => state.UsuarioReducer)

  async function handleSubmit(values, setSubmitting) {
    const { nome, senha, image } = values
    await dispatch(actions.updateUsuario(nome, senha, image, 'ProfilePicture'))
    setSubmitting(false)
  }

  return (
    <ScrollWrapperCenter>
      <View style={styles.ImgContainer}>
        <FastImage style={styles.Img} source={{ uri: avatar }} />
      </View>
      <H5 style={styles.greenText}>{sucesso}</H5>
      <H5 style={styles.erro}>{erro}</H5>
      <Form onSubmit={handleSubmit} />
    </ScrollWrapperCenter>
  )
}

export default Login
