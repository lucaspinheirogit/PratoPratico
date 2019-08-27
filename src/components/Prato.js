import React, { useState, useEffect } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'

import { Botao, BotaoTexto } from '../styled-components/Botao'
import { TituloPrato, DescricaoPrato, H4 } from '../styled-components/Texto'
import actions from '../redux/actions/UsuarioActionCreator'

const Prato = props => {
  const dispatch = useDispatch()
  const favoritos = useSelector(state => state.UsuarioReducer.favoritos)
  const { id, imagem, titulo, dificuldade } = props
  let { descricao } = props
  descricao = descricao.substring(0, 240)
  const [favorito, setFavorito] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (favoritos.includes(props.id)) {
        setFavorito(true)
      }
    }, 500)
  }, [])

  function favoritar() {
    setFavorito(!favorito)
    dispatch(actions.favorite(props.id, favorito))
  }

  return (
    <View style={styles.alignCenter}>
      <FastImage style={styles.image} source={{ uri: imagem }} resizeMode="cover">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(13, 43, 86, 0.85)', 'rgba(13, 43, 86, 0.3)']}
          style={styles.gradient}
        >
          <H4 style={styles.dificuldade}>{dificuldade}</H4>
          <TouchableWithoutFeedback onPress={favoritar} style={styles.padding5}>
            <Icon
              style={styles.icon}
              name="star"
              size={28}
              color={favorito ? '#f0f026' : 'rgba(240, 240, 38,0.4)'}
            />
          </TouchableWithoutFeedback>
        </LinearGradient>
      </FastImage>
      <TituloPrato>{titulo}</TituloPrato>
      <DescricaoPrato>{descricao}</DescricaoPrato>
      <Botao style={styles.marginBottom10} onPress={() => props.navegar('VerPrato', { id })}>
        <BotaoTexto style={styles.paddingHorizontal15}>Ver mais</BotaoTexto>
      </Botao>
    </View>
  )
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 280,
    borderColor: '#0d2b56',
    borderTopWidth: 2,
  },
  gradient: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  dificuldade: {
    textAlign: 'left',
    width: 150,
    color: '#FFF',
    textShadowColor: '#0d2b56',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  icon: {
    textShadowColor: '#0d2b56',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  padding5: { padding: 5 },
  marginBottom10: { marginBottom: 10 },
  paddingHorizontal15: { paddingHorizontal: 15 },
})

export default Prato
