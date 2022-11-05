import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:3500' })

export const request = ({ ...options }) => {

  const onSuccess = response => response
  const onError = error => {
    // optionaly catch errors and add additional logging here
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}