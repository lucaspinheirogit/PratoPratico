import React, { useState } from 'react'
import { Text } from 'react-native'

import API_URL from '~/src/api'
import Prato from '~/src/components/Prato'
import { ScrollWrapper } from '~/src/styled-components/Wrapper'

import AdvancedSearch from './form'
import PratosList from '../pratosList'
import styles from '../styles'

export default props => {
  const [pratos, setPratos] = useState([])
  const [mensagem, setMensagem] = useState('')

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

  async function handleSubmit({ nome, tempo, dificuldade, ing }, { setSubmitting }) {
    setPratos([])
    setMensagem('')

    let ingredientes = null
    nome ? '' : (nome = null)
    tempo ? (tempo *= 60) : (tempo = null)
    ing ? (ingredientes = ing.split(',')) : ''
    dificuldade === 'Qualquer' ? (dificuldade = null) : ''

    const response = await fetch(`${API_URL}/pratos/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        tempo,
        dificuldade,
        ingredientes,
      }),
    })

    const data = await response.json()
    if (data.length > 0) {
      setPratos(data)
    } else {
      setMensagem('Nenhum resultado encontrado')
    }
    setSubmitting(false)
  }

  return (
    <ScrollWrapper style={styles.paddingY10}>
      <AdvancedSearch onSubmit={handleSubmit} />
      <PratosList pratos={pratos} renderItem={renderItem} />
      <Text style={styles.center}>{mensagem}</Text>
    </ScrollWrapper>
  )
}
