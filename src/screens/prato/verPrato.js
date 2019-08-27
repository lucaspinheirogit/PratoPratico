import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, InteractionManager, StyleSheet } from 'react-native'

import API_URL from '~/src/api'
import PratoMax from '../../components/PratoMax'
import { Wrapper } from '../../styled-components/Wrapper'

const VerPrato = props => {
  const [prato, setPrato] = useState({})
  const [loading, setLoading] = useState(true)
  const { Nome, Descricao, ModoPreparo, TempoPreparo, Foto, Dificuldade, ingredientes } = prato

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      fetchPrato()
    })
  }, [])

  async function fetchPrato() {
    const response = await fetch(`${API_URL}/pratos/detalhe/${props.navigation.state.params.id}`)
    const data = await response.json()

    setPrato(data)
    setLoading(false)
  }

  return (
    <Wrapper>
      {loading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#1d3f72" />
        </View>
      ) : (
        <Wrapper>
          <PratoMax
            imagem={Foto}
            nome={Nome}
            descricao={Descricao}
            dificuldade={Dificuldade}
            modo={ModoPreparo}
            tempo={TempoPreparo}
            ingredientes={ingredientes}
          />
        </Wrapper>
      )}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  containerLoading: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default VerPrato
