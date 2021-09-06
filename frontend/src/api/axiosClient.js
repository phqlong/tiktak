import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
  headers: {
    "Content-type": "application/json"
  },
  paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
  const currentUser = JSON.parse(localStorage.getItem("userInfo"))
  if (currentUser) {
    config.headers.Authorization = `Bearer ${currentUser.token}`
  }
  return config
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response
  }
  return response
}, (error) => {
  throw error
})

export default axiosClient