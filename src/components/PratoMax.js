import React from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

import Ingrediente from './Ingrediente'
import { TituloPrato, DescricaoPrato, H4, H5 } from '../styled-components/Texto'
import { ScrollWrapperCenter } from '../styled-components/Wrapper'

export default props => {
  const { nome, imagem, descricao, dificuldade, modo, ingredientes } = props
  let { tempo } = props

  const date = new Date(null)
  date.setSeconds(tempo)
  tempo = date.toISOString().substr(11, 8)

  return (
    <ScrollWrapperCenter>
      <FastImage style={styles.image} source={{ uri: imagem }} resizeMode="cover">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['rgba(13, 43, 86, 0.75)', 'rgba(13, 43, 86, 0.1)']}
          style={styles.gradient}
        >
          <H4 style={styles.dificuldade}>{dificuldade}</H4>
        </LinearGradient>
      </FastImage>
      <TituloPrato>{nome}</TituloPrato>
      <DescricaoPrato>{descricao}</DescricaoPrato>

      <H4 style={styles.label}>Modo de Preparo</H4>
      <DescricaoPrato>{modo}</DescricaoPrato>

      <H4 style={styles.label}>Tempo de Preparo</H4>
      <DescricaoPrato style={styles.alignCenter}>{tempo}</DescricaoPrato>

      <H4 style={styles.label}>Ingredientes</H4>
      {ingredientes.length > 0 && (
        <View style={styles.ingredientesBox}>
          <View style={styles.ingredientesHeader}>
            <H5 style={styles.white}>Nome</H5>
          </View>
          <View style={styles.ingredientesHeader}>
            <H5 style={styles.white}>Quantidade</H5>
          </View>
          <View style={styles.ingredientesHeader}>
            <H5 style={styles.white}>Unidade de Medida</H5>
          </View>
        </View>
      )}
      {ingredientes.length > 0 ? (
        ingredientes.map(i => (
          <Ingrediente
            key={i.Id}
            nome={i.Nome}
            quantidade={i.Quantidade}
            unidade={i.UnidadeMedida}
          />
        ))
      ) : (
        <H5 style={styles.noMoreMessage}>Esse prato não possui ingredientes...</H5>
      )}
      <View style={styles.marginBottom50} />
    </ScrollWrapperCenter>
  )
}

const styles = StyleSheet.create({
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
  },
  dificuldade: {
    textAlign: 'left',
    color: '#FFF',
    textShadowColor: '#0d2b56',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    padding: 5,
  },
  alignCenter: { textAlign: 'center' },
  label: {
    width: '100%',
    textAlign: 'center',
    padding: 5,
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#0d2b56',
  },
  ingredientesBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientesHeader: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#305c9b',
    color: '#000',
  },
  white: { color: '#fff' },
  noMoreMessage: { margin: 5, color: '#777' },
  marginBottom50: { marginBottom: 50 },
})
