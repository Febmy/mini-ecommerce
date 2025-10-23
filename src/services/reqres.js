import axios from "axios";

export const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
    // header API key — ambil dari .env (fallback ke default free key)
    "x-api-key": import.meta.env.VITE_REQRES_API_KEY ?? "reqres-free-v1",
  },
});

// (opsional) kalau mau selalu injek terbaru dari env via interceptor:
api.interceptors.request.use((config) => {
  config.headers["x-api-key"] =
    import.meta.env.VITE_REQRES_API_KEY ?? "reqres-free-v1";
  return config;
});

// Endpoints
export const loginReqres = (payload) => api.post("/login", payload);
export const registerReqres = (payload) => api.post("/register", payload);
export const fetchUsers = (page = 1) => api.get("/users", { params: { page } });
export const fetchUser = (id) => api.get(`/users/${id}`);
