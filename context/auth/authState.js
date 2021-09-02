
import authContext from "./authContext"
import React, {useReducer} from "react"
import authReducer from "./authReducer"
import clientAxios from "../../config/axios"
import tokenAuth from "../../config/tokenAuth"
import {
  SUCCESSFUL_REGISTRATION,
  SUCCESSFUL_ERROR,
  CLEAR_MESSAGE,
  SUCCESSFUL_LOGIN,
  AUTH_COMPROBATION,
  LOG_OUT
} from "../../types"

const AuthState = ({children}) =>{
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("BStoken") :"",
    authenticated: null,
    user: null,
    message: null
  }
  const [state, dispatch] = useReducer(authReducer, initialState)
  const createUser = async(data) =>{
    try {
      const awswer = await clientAxios.post("/api/user", data)
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: awswer.data.msg
      })
    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({
        type: SUCCESSFUL_ERROR,
        payload: error.response.data.msg
      })
    }
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE
      })
    }, 4000);
  }


  const loginSuccesful = async(data) =>{
    try {
      const awswer = await clientAxios.post("/api/auth", data)
      console.log(awswer)
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: awswer.data.token
      })
    } catch (error) {
      dispatch({
        type: SUCCESSFUL_ERROR,
        payload: error.response.data.msg
      })
    }
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE
      })
    }, 4000);
  }


  const userAutentification = async() => {
    const token = localStorage.getItem("BStoken")
    if(token){
      tokenAuth(token)
    }
    try{
      const awswer = await clientAxios.get("/api/auth")
      if(awswer.data.user){
        dispatch({
        type: AUTH_COMPROBATION,
        payload: awswer.data.user
      })
      }
    } catch(error) {
      dispatch({
        type: SUCCESSFUL_ERROR,
        payload: error.response.data.msg
      })
    }
    setTimeout(() => {
      dispatch({
        type: CLEAR_MESSAGE
      })
    }, 4000);
  }


  const logOut = () =>{
    dispatch({
        type: LOG_OUT
      })
  }


  return(
    <authContext.Provider
    value= {{
      token: state.token,
      authenticated: state.authenticated,
      user: state.user,
      message: state.message,
      createUser,
      loginSuccesful,
      userAutentification,
      logOut
    }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthState