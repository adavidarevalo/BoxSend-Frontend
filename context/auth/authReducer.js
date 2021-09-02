
import {
  SUCCESSFUL_REGISTRATION,
  SUCCESSFUL_ERROR,
  CLEAR_MESSAGE,
  SUCCESSFUL_LOGIN,
  AUTH_COMPROBATION,
  LOG_OUT
} from "../../types"

export default (state, action) =>{
  switch (action.type) {
    case SUCCESSFUL_REGISTRATION: 
    case SUCCESSFUL_ERROR:
    return {
      ...state,
      message: action.payload
    }
    case CLEAR_MESSAGE:
      return{
        ...state,
        message: null
      }
    case SUCCESSFUL_LOGIN:
      localStorage.setItem("BStoken", action.payload)
      return{
        ...state,
        token: action.payload,
        authenticated: true
      }
    case AUTH_COMPROBATION:
      return{
        ...state,
        user: action.payload,
        authenticated: true
      }
    case LOG_OUT:
      localStorage.removeItem("BStoken")
      return{
        ...state,
        user: null,
        token: null,
        authenticated: null
      }
    default:
      return state
  }
}

