import React, { useState } from 'react'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
  // webClientId: '896186886067-jtrgdajd8f0e7r9e7vjnbf81b942m4a3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const home = () => {
  const [isSigninInProgress, setisSigninInProgress] = useState(false)

  async function signIn() {
    try {
      setisSigninInProgress(true)
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setisSigninInProgress(false)
      console.log({ userInfo })
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={isSigninInProgress}
    />
  )
}

export default home
