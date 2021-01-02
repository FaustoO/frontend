import axios from "axios"

const axiosConfig = {
  baseURL: "https://rocky-springs-97474.herokuapp.com/"
}
const myaxios = axios.create(axiosConfig)
export default myaxios
