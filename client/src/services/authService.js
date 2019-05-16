import http from "../services/httpService"
import jwtDecode from "jwt-decode"

const apiEndpoint = process.env.REACT_APP_API_URL + "/auth/login"
const tokenKey = "token"

http.setJwt(getJwt())

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password })
  localStorage.setItem(tokenKey, jwt)
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt)
}

function logout() {
  localStorage.removeItem(tokenKey)
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    const user = jwtDecode(jwt)
    return user
  } catch (error) {
    return null
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey)
}

function isValidJwt() {
  const jwt = localStorage.getItem(tokenKey)
  if (!jwt) return false

  const decoded = jwtDecode(jwt)
  if (Date.now() / 1000 > decoded.exp) return false

  return true
}

async function verifyJwt() {
  try {
    await http.get(`${process.env.REACT_APP_API_URL}/auth/verify`)
  } catch (error) {
    logout()
    window.location = "/login"
  }
  return true
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  isValidJwt,
  verifyJwt
}
