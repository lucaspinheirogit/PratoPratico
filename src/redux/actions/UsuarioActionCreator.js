import API_URL from '~/src/api';
import AsyncStorage from '~/src/util/AsyncStorage'
import NavigationService from '~/src/util/NavigationService'

import {
  LOGIN,
  ERROR,
  LOADING_CHANGED,
  GET_USUARIO,
  UPDATE_USUARIO,
  SUCESSO,
  FAVORITE,
} from '../actionsTypes/UsuarioActionTypes'

export default {
  login(email, senha) {
    return async dispatch => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha }),
        })

        const data = await response.json()
        if (response.ok) {
          await AsyncStorage.setItem('token', data.token).then(() => {
            dispatch({ type: LOGIN, nome: data.username, email })
            NavigationService.navigate('TabNavigator', {})
          })
        } else {
          throw new Error(data)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }
    }
  },
  signup(nome, email, senha, img, imgNome) {
    return async dispatch => {
      if (img === '' || img === null) {
        const json = require('../../img/defaultUser.json')
        img = json.base64
      }

      const body = JSON.stringify({
        nome,
        email,
        senha,
        img,
        imgNome,
      })

      try {
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body,
        })

        const data = await response.json()

        if (response.ok) {
          await AsyncStorage.setItem('token', data.token).then(() => {
            NavigationService.navigate('TabNavigator', {})
          })
        } else {
          throw new Error(data)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }
    }
  },
  getUsuario() {
    return async dispatch => {
      dispatch({ type: LOADING_CHANGED, loading: true })

      try {
        const response = await fetch(`${API_URL}/usuarios`, {
          headers: {
            Authorization: await AsyncStorage.getItem('token'),
          },
        })

        const data = await response.json()

        if (response.ok) {
          dispatch({
            type: GET_USUARIO,
            nome: data.Nome,
            email: data.Email,
            foto: data.img,
            pratos: data.pratos,
            favoritos: data.favoritos,
          })
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }

      dispatch({ type: LOADING_CHANGED, loading: false })
    }
  },
  updateUsuario(nome, senha, img, imgNome) {
    return async dispatch => {
      if (nome === '' || nome === null) {
        dispatch({ type: ERROR, erro: 'Nome não pode estar vazio!' })
      } else if (senha === '' || senha === null) {
        dispatch({ type: ERROR, erro: 'Senha não pode estar vazia!' })
      } else {
        dispatch({ type: LOADING_CHANGED, loading: true })

        const body = JSON.stringify({
          nome,
          senha,
          img,
          imgNome,
        })

        try {
          const response = await fetch(`${API_URL}/usuarios`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: await AsyncStorage.getItem('token'),
            },
            body,
          })

          const data = await response.json()

          if (response.ok) {
            dispatch({ type: UPDATE_USUARIO, nome, foto: img })
            dispatch({ type: SUCESSO, sucesso: data.message })
          } else {
            throw new Error(data.message)
          }
        } catch (e) {
          dispatch({ type: ERROR, erro: e.message })
        }

        dispatch({ type: LOADING_CHANGED, loading: false })
      }
    }
  },
  renewUsuario() {
    return async () => {
      const response = await fetch(`${API_URL}/auth/renew`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: await AsyncStorage.getItem('token'),
        },
      })

      const data = await response.json()
      if (response.ok && data.token !== undefined) {
        await AsyncStorage.setItem('token', data.token).then(() => {
          NavigationService.navigate('TabNavigator')
        })
      } else {
        await AsyncStorage.removeItem('token')
      }
    }
  },
  favorite(id, isFav) {
    return async dispatch => {
      fetch(`${API_URL}/favoritos/${id}`, {
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
      })

      dispatch({ type: FAVORITE, id, isFav })
    }
  },
}
