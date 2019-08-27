import React, { useState, useEffect } from 'react'
import { View, FlatList, ActivityIndicator, InteractionManager, StyleSheet } from 'react-native'

import API_URL from '~/src/api'
import Prato from '~/src/components/Prato'
import { Botao, BotaoTexto } from '~/src/styled-components/Botao'
import { H5 } from '~/src/styled-components/Texto'
import { Wrapper, WrapperCenter } from '~/src/styled-components/Wrapper'
import AsyncStorage from '~/src/util/AsyncStorage'

export default props => {
  const [favoritos, setFavoritos] = useState([])
  const [pagination, setPagination] = useState({
    limit: 2,
    offset: 0,
    hasMore: true,
    loading: true,
  })
  const [isFetching, setIsFetching] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const { offset, limit } = pagination
    InteractionManager.runAfterInteractions(() => {
      getFavoritos(offset, limit)
    })
  }, [])

  async function getFavoritos(offset, limit) {
    try {
      setErro('')
      const response = await fetch(`${API_URL}/favoritos?offset=${offset}&limit=${limit}`, {
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
      })
      const data = await response.json()
      setFavoritos([...favoritos, ...data.pratos])
      setPagination({
        ...pagination,
        offset: pagination.offset + pagination.limit,
        hasMore: data.pagination.hasMore,
        loading: false,
      })
    } catch (e) {
      setErro('Não foi possivel carregar os favoritos, tente novamente mais tarde!')
    }
  }

  async function onRefresh() {
    try {
      setErro('')
      setIsFetching(true)
      const response = await fetch(`${API_URL}/favoritos?limit=${pagination.limit}`, {
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
      })
      const data = await response.json()

      setFavoritos([...data.pratos])
      setPagination({
        ...pagination,
        offset: pagination.limit,
        hasMore: data.pagination.hasMore,
        loading: false,
      })
    } catch (e) {
      setErro('Não foi possivel carregar os favoritos, tente novamente mais tarde!')
    }
    setIsFetching(false)
  }

  function renderFooter() {
    return (
      <View style={styles.alignCenter}>
        {pagination.hasMore ? (
          <ActivityIndicator style={styles.margin20} size="large" color="#1d3f72" />
        ) : (
          <H5 style={styles.noMoreMessage}>Não há mais favoritos...</H5>
        )}
      </View>
    )
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
    <Wrapper>
      {pagination.loading ? (
        <WrapperCenter>
          <ActivityIndicator size="large" color="#1d3f72" />
        </WrapperCenter>
      ) : (
        <View style={styles.flex1}>
          <View>
            {erro !== '' && <H5 style={styles.erro}>{erro}</H5>}
            <FlatList
              data={favoritos}
              onRefresh={onRefresh}
              refreshing={isFetching}
              renderItem={renderItem}
              keyExtractor={item => item.Id.toString()}
              onEndReached={
                pagination.hasMore ? getFavoritos(pagination.offset, pagination.limit) : ''
              }
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
            />
          </View>
          <Botao style={styles.btnAddPrato} onPress={() => props.navigation.navigate('AddPrato')}>
            <BotaoTexto style={styles.btnAddPratoText}>+</BotaoTexto>
          </Botao>
        </View>
      )}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  erro: { color: 'red' },
  btnAddPrato: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 45,
  },
  btnAddPratoText: { fontSize: 22 },
  alignCenter: { alignItems: 'center' },
  margin20: { margin: 20 },
  noMoreMessage: { marginBottom: 80, color: '#CCC' },
})
