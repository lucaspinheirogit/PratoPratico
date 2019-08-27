import {
  GET_PRATOS,
  LOADING_CHANGED,
  ERROR,
  SUCESSO,
  SUCESSO_INGREDIENT,
} from '../actionsTypes/PratoActionTypes'

const INITIAL_STATE = {
  pratos: [],
  offset: 0,
  limit: 5,
  hasMore: true,
  loading: false,
  erro: '',
  sucesso: '',
  sucessoIngredient: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRATOS: {
      return {
        ...state,
        pratos: [...state.pratos, ...action.pratos],
        offset: state.offset + state.limit,
        hasMore: action.hasMore,
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
        sucessoIngredient: '',
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
    case SUCESSO_INGREDIENT: {
      return {
        ...state,
        sucessoIngredient: action.sucesso,
      }
    }
    default:
      return state
  }
}
