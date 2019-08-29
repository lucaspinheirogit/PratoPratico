import React, { useState } from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import API_URL from '~/src/api'
import Prato from '~/src/components/Prato'
import { Botao, BotaoTexto } from '~/src/styled-components/Botao'
import { ScrollWrapper } from '~/src/styled-components/Wrapper'

import PratosList from '../pratosList'
import styles from '../styles'

const BuscaNormal = props => {
  const [pratos, setPratos] = useState([])
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)

  async function buscaSimples() {
    setMensagem('')
    setLoading(true)

    const response = await fetch(`${API_URL}/pratos/random`)
    const data = await response.json()

    setPratos(data)
    setLoading(false)
  }

  function renderItem({ item }) {
    return (
      <Prato
        key={item.Id}
        id={item.Id}
        titulo={item.Nome}
        descricao={item.Descricao}
        imagem={item.Foto}
        dificuldade={item.Dificuldade}
        navegar={props.navigation.navigate}
      />
    )
  }

  return (
    <ScrollWrapper>
      <TouchableOpacity style={styles.btnBuscarFull} onPress={buscaSimples}>
        <BotaoTexto>Buscar</BotaoTexto>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator style={styles.marginTop150} size="large" color="#1d3f72" />
      ) : (
        <PratosList pratos={pratos} renderItem={renderItem} />
      )}
      {mensagem !== '' && <Text style={styles.center}>{mensagem}</Text>}
    </ScrollWrapper>
  )
}

export default BuscaNormal
