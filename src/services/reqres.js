import axios from 'axios'
const api = axios.create({ baseURL: 'https://reqres.in/api', headers: { 'x-api-key': 'reqres-free-v1' } })
export async function fetchUsers(page=1){ const {data} = await api.get('/users',{params:{page}}); return data }
export async function fetchUser(id){ const {data} = await api.get(`/users/${id}`); return data }
export async function loginReqres({email,password}){ const {data} = await api.post('/login',{email,password}); return data }
export async function registerReqres({email,password}){ const {data} = await api.post('/register',{email,password}); return data }
