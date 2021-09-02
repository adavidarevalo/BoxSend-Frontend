
import React, {useReducer} from "react"
import appContext from "./appContext"
import appReducer from "./appReducer"
import clientAxios from "../../config/axios"

import {
    SUCCESSFUL_ERROR,
    CLEAR_MESSAGE,
    UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    LOADING_TRUE,
    LINK_CREATES_SUCCESSFUL,
    CLEAR_STATE,
    GET_PASSWORD,
    GET_DOWLOADS
} from "../../types"


const AppState = ({children}) =>{
    const initialState = {
        messageError: null,
        name: "",
        originalName: "",
        loading: null,
        downloads: 1,
        password: "",
        author: "",
        url:""
    }
    const [state, dispatch] = useReducer(appReducer, initialState)

    const heavyFile = error =>{
        dispatch({
            type: SUCCESSFUL_ERROR,
            payload: error
        })
        setTimeout(() => {
            dispatch({
                type: CLEAR_MESSAGE
            })
        }, 5000);
    }

    const UploadFile = async (formData, originalNCo) => {
        dispatch({
            type: LOADING_TRUE
        })
        try {
            const awswer = await clientAxios.post("/api/file", formData)
            dispatch({
                type: UPLOAD_FILE,
                payload: {
                    name: awswer.data.file,
                    originalName: originalNCo
                }
            })
        } catch (error) {
            dispatch({
                type: UPLOAD_FILE_ERROR
            })
            setTimeout(() => {
                dispatch({
                    type: CLEAR_MESSAGE
                })
            }, 5000);
        }
    }

    const createLink = async() =>{
        const data = {
            name: state.name,
            originalName: state.originalName,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }
        try {
            const awswer = await clientAxios.post("/api/link", data)
            dispatch({
                type: LINK_CREATES_SUCCESSFUL,
                payload: awswer.data.msg
            })
        } catch (error) {
            dispatch({
                type: UPLOAD_FILE_ERROR
            })
            setTimeout(() => {
                dispatch({
                    type: CLEAR_MESSAGE
                })
            }, 5000);
        }
    }

    const clearState = ()=>{
      dispatch({
        type: CLEAR_STATE
      })
    }

    const getPassword = pass =>{
      dispatch({
        type: GET_PASSWORD,
        payload: pass
      })
    }


    const getDowloads = data =>{
      dispatch({
        type: GET_DOWLOADS,
        payload: data
      })
    }
    return(
        <appContext.Provider
        value={{
            messageError: state.messageError,
            loading: state.loading,
            url: state.url,
            heavyFile,
            UploadFile,
            createLink,
            clearState,
            getPassword,
            getDowloads
        }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState