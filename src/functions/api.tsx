import axios from "./axios"

const getdata = async () => {
  await axios
    .get(`project/all`)
    .then(res => {
      res.data
    })
    .catch(err => console.log(err))
  console.log(getdata)
  return getdata
}
export { getdata }
