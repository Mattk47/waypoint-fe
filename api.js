import axios from 'axios'

const api = axios.create({
  baseURL: 'https://waypoint-server.herokuapp.com/api',
})

export const getUsers = async () => {
  const { data } = await api.get('/users')
  return data
}
