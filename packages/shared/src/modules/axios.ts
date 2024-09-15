import Axios from 'axios'

let apiUrl = 'http://localhost:4001'

export let axios = Axios.create({
  baseURL: apiUrl,
})

export const setAPIUrl = (url: string) => {
  apiUrl = url

  axios = Axios.create({
    baseURL: apiUrl,
  })
}
