import React, { useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator, InteractionManager, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Prato from '~/src/components/Prato'
import actions from '~/src/redux/actions/PratoActionCreator'
import { Botao, BotaoTexto } from '~/src/styled-components/Botao'
import { H5 } from '~/src/styled-components/Texto'
import { Wrapper, WrapperCenter } from '~/src/styled-components/Wrapper'
import AsyncStorage from '~/src/util/AsyncStorage'

const Feed = props => {
  const dispatch = useDispatch()
  const { pratos, offset, limit, hasMore, erro } = useSelector(state => state.PratoReducer)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      await getToken()
    })
  }, [])

  async function getToken() {
    const token = await AsyncStorage.getItem('token')
    if (!token) {
      props.navigation.navigate('Home')
    } else {
      dispatch(actions.getPratos(offset, limit))
    }
  }

  function renderFooter() {
    return (
      <View style={styles.alignCenter}>
        {hasMore ? (
          <ActivityIndicator style={styles.margin20} size="large" color="#1d3f72" />
        ) : (
          <H5 style={styles.noMoreMessage}>Não há mais pratos...</H5>
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

  async function onRefresh() {
    setIsFetching(true)

    dispatch(actions.getPratos(0, limit))

    setIsFetching(false)
  }

  return (
    <Wrapper>
      {!pratos.length ? (
        <WrapperCenter>
          <ActivityIndicator size="large" color="#1d3f72" />
        </WrapperCenter>
      ) : (
        <View style={styles.container}>
          <View>
            {erro !== '' && <H5 style={styles.erro}>{erro}</H5>}
            <FlatList
              onRefresh={onRefresh}
              refreshing={isFetching}
              data={pratos}
              renderItem={renderItem}
              keyExtractor={item => item.Id.toString()}
              onEndReached={() => {
                if (hasMore) dispatch(actions.getPratos(offset, limit))
              }}
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
  container: { flex: 1 },
  alignCenter: { alignItems: 'center' },
  margin20: { margin: 20 },
  noMoreMessage: { marginBottom: 80, color: '#444' },
  erro: { color: 'red' },
  btnAddPrato: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 45,
  },
  btnAddPratoText: { fontSize: 22 },
})

export default Feed
