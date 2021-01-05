import axios from "axios"

const axiosConfig = {
  baseURL: "http://127.0.0.1:8000/"
}
const myaxios = axios.create(axiosConfig)
export default myaxios
