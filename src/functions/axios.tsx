import axios from "axios"

const axiosConfig = {
  baseURL: "https://milestonebackendapp.herokuapp.com/"
}
const myaxios = axios.create(axiosConfig)
export default myaxios
