import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: { 'Content-Type': 'application/json' }
})

// Auth endpoints
export const loginReqres = (payload) => api.post('/login', payload)        // { email, password }
export const registerReqres = (payload) => api.post('/register', payload)  // { email, password }

// Users endpoints
export const fetchUsers = (page=1) => api.get('/users', { params: { page } })
export const fetchUser = (id) => api.get(`/users/${id}`)
