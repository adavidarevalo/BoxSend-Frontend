
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

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_ERROR: 
            return{
                ...state,
                messageError: action.payload
            }
        case CLEAR_MESSAGE:
            return{
                ...state,
                messageError: null
            }
        case UPLOAD_FILE:
            return{
                ...state,
                name: action.payload.name,
                originalName: action.payload.originalName,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return{
                ...state,
                messageError: "There was a Error",
                loading: null
            }
        case LOADING_TRUE:
            return{
                ...state,
                loading: true
            }
        case LINK_CREATES_SUCCESSFUL:
            return{
                ...state,
                url: action.payload
            }
        case CLEAR_STATE:
          return{
            ...state,
            messageError: null,
            name: "",
            originalName: "",
            loading: null,
            downloads: 1,
            password: "",
            author: "",
            url:""            
          }
        case GET_PASSWORD:
          return{
            ...state,
            password: action.payload
          }
        case GET_DOWLOADS:
          return{
            ...state,
            downloads: action.payload
          }
        default:
            return state;
    }
}