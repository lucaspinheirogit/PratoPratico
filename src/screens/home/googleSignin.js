import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { Botao, BotaoTexto } from '~/src/styled-components/Botao'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  // webClientId: '896186886067-jtrgdajd8f0e7r9e7vjnbf81b942m4a3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
})

const home = () => {
  const [isSigninInProgress, setisSigninInProgress] = useState(false)

  async function signIn() {
    setisSigninInProgress(true)
    try {
      let userInfo = {}
      const isSignedIn = await GoogleSignin.isSignedIn()
      if (isSignedIn) {
        userInfo = await GoogleSignin.getCurrentUser()
      } else {
        await GoogleSignin.hasPlayServices()
        userInfo = await GoogleSignin.signIn()
      }
      console.log({ userInfo })
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    setTimeout(() => {
      setisSigninInProgress(false)
    }, 500)
  }

  return isSigninInProgress ? (
    <ActivityIndicator size="large" color="#1d3f72" />
  ) : (
    <Botao style={styles.btnGoogleLogin} onPress={signIn} disabled={isSigninInProgress}>
      <Text style={styles.btnText}>Entrar com </Text>
      <Icon style={styles.icon} name="google" size={18} color="#FFF" />
      <Text style={{ fontSize: 16, color: '#E94334', fontWeight: 'bold' }}>o</Text>
      <Text style={{ fontSize: 16, color: '#F7BD0A', fontWeight: 'bold' }}>o</Text>
      <Text style={{ fontSize: 16, color: '#4285F8', fontWeight: 'bold' }}>g</Text>
      <Text style={{ fontSize: 16, color: '#37A752', fontWeight: 'bold' }}>l</Text>
      <Text style={{ fontSize: 16, color: '#E94334', fontWeight: 'bold', paddingRight: 10 }}>
        e
      </Text>
    </Botao>
  )
}

const styles = StyleSheet.create({
  btnGoogleLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d4885',
  },
  icon: {
    color: '#4285F8',
    paddingLeft: 2,
  },
  btnText: {
    paddingLeft: 10,
    color: '#FFF',
    fontSize: 12,
  },
})

export default home
