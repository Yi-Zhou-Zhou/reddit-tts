import axios from "axios"
export const customAxios = axios.create()
export const api = axios.create()

customAxios.defaults.baseURL = import.meta.env.VITE_BACKEND_HOST

api.defaults.withCredentials = true

api.defaults.baseURL = import.meta.env.VITE_BACKEND_HOST