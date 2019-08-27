import moment from 'moment'
import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Botao, BotaoTexto } from '../styled-components/Botao'
import { H5, H6 } from '../styled-components/Texto'

const PratoPerfil = props => {
  const { id, nome, data } = props
  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <H5 style={styles.nome}>{nome}</H5>
        <H6 style={styles.data}>
          Criado em:
          {` ${moment(data).format('DD/MM/YYYY')}`}
        </H6>
      </View>
      <Botao style={styles.btnVerPrato} onPress={() => props.navegar('VerPrato', { id })}>
        <BotaoTexto style={styles.paddingX10}>Ver</BotaoTexto>
      </Botao>
      <Botao style={styles.btnEditarPrato} onPress={() => props.navegar('EditarPrato', { id })}>
        <BotaoTexto style={styles.paddingX10}>Editar</BotaoTexto>
      </Botao>
      <Botao style={styles.btnExcluirPrato} onPress={() => props.excluir(id)}>
        <BotaoTexto style={styles.paddingX10}>Excluir</BotaoTexto>
      </Botao>
    </View>
  )
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  container: {
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#305c9b',
  },
  nome: { color: '#FFF', textAlign: 'left' },
  data: { color: '#AAA', textAlign: 'left', fontSize: 11 },
  btnVerPrato: {
    backgroundColor: '#305c9b',
    borderWidth: 0,
    width: 55,
  },
  btnExcluirPrato: {
    backgroundColor: '#8f0310',
    borderWidth: 0,
    width: 70,
  },
  btnEditarPrato: {
    backgroundColor: '#068a2d',
    borderWidth: 0,
    width: 65
  },
  paddingX10: { paddingHorizontal: 10 },
})

export default PratoPerfil
