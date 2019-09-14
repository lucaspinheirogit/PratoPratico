import {
  GET_PRATOS,
  LOADING_CHANGED,
  ERROR,
  SUCESSO,
  SUCESSO_INGREDIENT,
  CLEAR_PRATOS,
} from '../actionsTypes/PratoActionTypes'

const INITIAL_STATE = {
  pratos: [],
  offset: 0,
  limit: 2,
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
        erro: ''
      }
    }
    case CLEAR_PRATOS: {
      return {
        ...state,
        pratos: [],
        offset: 0,
        erro: ''
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
        erro: ''
      }
    }
    case SUCESSO_INGREDIENT: {
      return {
        ...state,
        sucessoIngredient: action.sucesso,
        erro: ''
      }
    }
    default:
      return state
  }
}
