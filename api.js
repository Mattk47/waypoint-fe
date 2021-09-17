import axios from 'axios'

const api = axios.create({
  baseURL: 'https://waypoint-server.herokuapp.com/api',
})

export const getUser = async (username) => {
  const { data } = await api.get(`/users/${username}`)
  return data
}

export const getUsers = async () => {
  const { data } = await api.get('/users')
  return data
}

export const postUser = async (userObj) => {
  const { data } = await api.post('/users', userObj)
  return data
}

export const patchUser = async (name, avatar_url, password, username) => {
  const { data } = await api.patch(`/users/${username}`, {
    name,
    avatar_url,
    password,
  })
  return data
}

export const deleteUser = async (username) => {
  const { data } = await api.delete(`/users/${username}`)
  return data
}

export const getRouteByUser = async (username) => {
  const { data } = await api.get(`/routes/${username}`)
  return data
}

export const getAllRoutes = async () => {
  const { data } = await api.get('/routes')
  return data
}

export const getRouteById = async (routeId) => {
  const { data } = await api.get(`/routes/${routeId}`)
  return data
}

export const postRoute = async (routeObj) => {
  const { data } = await api.post('/routes', routeObj)
  return data
}

export const patchRouteById = async (routeId, vote) => {
  const { data } = await api.patch(`/routes/${routeId}`, { vote })
  return data
}

export const deleteRouteById = async (routeId) => {
  const { data } = await api.delete(`/routes/${routeId}`)
  return data
}

export const getPoiByRouteById = async (routeId) => {
  const { data } = await api.get(`/routes/${routeId}/poi`)
  return data
}

export const postPoiByRouteById = async (routeId, photo, narration) => {
  const { data } = await api.post(`/routes/${routeId}/poi`, {
    photo,
    narration,
  })
  return data
}

export const patchPoi = async (poiId, narration) => {
  const { data } = await api.patch(`/poi/${poiId}`, { narration })
  return data
}

export const deletePoi = async (poiId) => {
  const { data } = await api.delete(`/poi/${poiId}`)
  return data
}
export const getCommentsByRoute = async (routeId) => {
  const { data } = await api.get(`/routes/${routeId}/comments`)
  return data
}

export const postCommentsByRoute = async (routeId, commentObj) => {
  const { data } = await api.post(`/routes/${routeId}/comments`, commentObj)
  return data
}

export const deleteComment = async (commentId) => {
  const { data } = await api.delete(`/comments/${commentId}`)
  return data
}

export const patchComment = async (commentId, vote) => {
  const { data } = await api.patch(`/comments/${commentId}`, { vote })
  return data
}
