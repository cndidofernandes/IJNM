import axios from "axios";
import {parseCookies} from 'nookies'

const api = axios.create({
    baseURL: 'api/'
})

if(parseCookies()['igreja.token']) api.defaults.headers['Authorization'] = `Bearer ${parseCookies()['igreja.token']}`

export default api;