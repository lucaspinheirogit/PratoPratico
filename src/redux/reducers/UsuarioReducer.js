import {
  LOGIN,
  ERROR,
  LOADING_CHANGED,
  GET_USUARIO,
  UPDATE_USUARIO,
  DELETE_PRATO,
  SUCESSO,
  FAVORITE,
} from '../actionsTypes/UsuarioActionTypes'

const INITIAL_STATE = {
  nome: '',
  email: '',
  foto: '',
  pratos: [],
  favoritos: [],
  erro: '',
  sucesso: '',
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        nome: action.nome,
        email: action.email,
        erro: '',
      }
    }
    case GET_USUARIO: {
      return {
        ...state,
        nome: action.nome,
        email: action.email,
        foto: action.foto,
        pratos: action.pratos,
        favoritos: action.favoritos,
        erro: '',
      }
    }
    case UPDATE_USUARIO: {
      if (action.foto) {
        return {
          ...state,
          nome: action.nome,
          foto: action.foto,
          erro: '',
        }
      }
      return {
        ...state,
        nome: action.nome,
        erro: '',
      }
    }
    case DELETE_PRATO: {
      const pratos = state.pratos.filter(prato => prato.Id !== action.id)

      return {
        ...state,
        pratos,
      }
    }
    case FAVORITE: {
      let { favoritos } = state
      if (action.isFav) {
        favoritos = favoritos.filter(favs => favs !== action.id)
      } else {
        favoritos.push(action.id)
      }

      return {
        ...state,
        favoritos,
      }
    }
    case ERROR: {
      return {
        ...state,
        erro: action.erro,
      }
    }
    case SUCESSO: {
      return {
        ...state,
        sucesso: action.sucesso,
      }
    }
    case LOADING_CHANGED: {
      if (action.loading) {
        return {
          ...state,
          loading: action.loading,
          erro: '',
          sucesso: '',
        }
      }
      return {
        ...state,
        loading: action.loading,
      }
    }
    default:
      return state
  }
}
