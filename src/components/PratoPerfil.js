import moment from 'moment'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Botao } from '../styled-components/Botao'
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
      <Botao style={styles.btnIcon} onPress={() => props.navegar('VerPrato', { id })}>
        <Icon name="eye" size={20} color="#FFF" />
      </Botao>
      <Botao style={styles.btnIcon} onPress={() => props.navegar('EditarPrato', { id })}>
        <Icon name="edit" size={20} color="#00ff4c" />
      </Botao>
      <Botao style={styles.btnIcon} onPress={() => props.excluir(id)}>
        <Icon name="trash" size={20} color="#ff0017" />
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
  btnIcon: {
    borderWidth: 0,
    width: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  paddingX10: { paddingHorizontal: 10 },
})

export default PratoPerfil
