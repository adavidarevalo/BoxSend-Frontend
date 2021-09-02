
import axios from "axios"

const clientAxios = axios.create({
  baseURL: 'https://boxsend.herokuapp.com/'
})

export default clientAxios