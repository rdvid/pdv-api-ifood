import axios from 'axios'

const viaCepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

export {
    viaCepApi
}