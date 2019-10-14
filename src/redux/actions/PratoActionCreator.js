import API_URL from '~/src/api'
import AsyncStorage from '~/src/util/AsyncStorage'

import {
  GET_PRATOS,
  LOADING_CHANGED,
  ERROR,
  SUCESSO,
  SUCESSO_INGREDIENT,
  CLEAR_PRATOS,
} from '../actionsTypes/PratoActionTypes'
import { SUCESSO as SUCESSO_USUARIO, DELETE_PRATO } from '../actionsTypes/UsuarioActionTypes'

export default {
  getPratos(offset, limit) {
    return async dispatch => {
      try {
        const response = await fetch(`${API_URL}/pratos?offset=${offset}&limit=${limit}`, {
          headers: {
            Authorization: await AsyncStorage.getItem('token'),
          },
        })
        const data = await response.json()

        if (response.ok) {
          if (offset === 0) dispatch({ type: CLEAR_PRATOS })
          dispatch({ type: GET_PRATOS, pratos: data.pratos, hasMore: data.pagination.hasMore })
        } else {
          throw new Error(data)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }
    }
  },
  create(nome, descricao, ingredientes, modo, tempo, dificuldade, img) {
    return async dispatch => {
      const formData = new FormData()
      formData.append('nome', nome)
      formData.append('descricao', descricao)
      formData.append('ingredientes', ingredientes)
      formData.append('modo', modo)
      formData.append('tempo', tempo)
      formData.append('publica', 1)
      formData.append('dificuldade', dificuldade)
      formData.append('fileData', {
        uri: img.uri,
        type: img.type,
        name: img.fileName
      });

      dispatch({ type: LOADING_CHANGED, loading: true })

      try {
        const response = await fetch(`${API_URL}/pratos`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: await AsyncStorage.getItem('token'),
          },
          body: formData,
        })

        const data = await response.json()

        if (response.ok) {
          dispatch({ type: SUCESSO, sucesso: data.message })
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        // console.log(e)
        // dispatch({ type: ERROR, erro: e.message })
      }

      dispatch({ type: LOADING_CHANGED, loading: false })
    }
  },
  update(id, nome, descricao, modo, tempo, dificuldade, img) {
    return async dispatch => {
      const formData = new FormData()
      formData.append('nome', nome)
      formData.append('descricao', descricao)
      formData.append('modo', modo)
      formData.append('tempo', tempo)
      formData.append('publica', 1)
      formData.append('dificuldade', dificuldade)
      formData.append('fileData', {
        uri: img.uri,
        type: img.type,
        name: img.fileName
      });

      dispatch({ type: LOADING_CHANGED, loading: true })

      try {
        const response = await fetch(`${API_URL}/pratos/${id}/update`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: await AsyncStorage.getItem('token'),
          },
          body: formData,
        })

        const data = await response.json()

        if (response.ok) {
          dispatch({ type: SUCESSO, sucesso: data.message })
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }

      dispatch({ type: LOADING_CHANGED, loading: false })
    }
  },
  delete(id) {
    return async dispatch => {
      try {
        const response = await fetch(`${API_URL}/pratos/${id}/delete`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: await AsyncStorage.getItem('token'),
          },
        })

        const data = await response.json()

        if (response.ok) {
          dispatch({ type: DELETE_PRATO, id })
          dispatch({ type: SUCESSO_USUARIO, sucesso: data.message })
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }
    }
  },
  deleteIngredient(pratoId, id) {
    return async dispatch => {
      try {
        const response = await fetch(`${API_URL}/pratos/${pratoId}/ingredient/${id}/delete`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: await AsyncStorage.getItem('token'),
          },
        })

        const data = await response.json()

        if (response.ok) {
          dispatch({ type: SUCESSO_INGREDIENT, sucesso: 'ingrediente excluído com sucesso' })
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }
    }
  },
  addIngredient(id, nome, quantidade, unidadeMedida) {
    return async dispatch => {
      try {
        const response = await fetch(`${API_URL}/pratos/${id}/ingredient`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: await AsyncStorage.getItem('token'),
          },
          body: JSON.stringify({ nome, quantidade, unidadeMedida }),
        })

        const data = await response.json()

        if (response.ok) {
          dispatch({ type: SUCESSO_INGREDIENT, sucesso: 'ingrediente adicionado com sucesso' })
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        dispatch({ type: ERROR, erro: e.message })
      }
    }
  },
}
