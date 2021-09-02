
import React, {useContext} from "react"
import authContext from "../context/auth/authContext"
import appContext from "../context/app/appContext"
import {css} from "@emotion/react"


const Alert = () =>{
  const AuthContext = useContext(authContext)
  const {message} = AuthContext
  const AppContext = useContext(appContext)
  const {messageError} = AppContext
  return(
    <div>
      <p css={css`
      color: red;
      text-align: center;
      `}>{message || messageError}</p>
    </div>
  )
}

export default Alert