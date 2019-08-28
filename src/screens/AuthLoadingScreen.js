import React, { useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import actions from '../redux/actions/UsuarioActionCreator'
import AsyncStorage from '../util/AsyncStorage'

export default props => {
  const dispatch = useDispatch()

  useEffect(() => {
    getToken()
  }, [])

  async function getToken() {
    const token = await AsyncStorage.getItem('token')
    if (token) await dispatch(actions.renewUsuario())
    props.navigation.navigate(token ? 'App' : 'Auth')
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0d2b56" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3269BB'
  }
})
