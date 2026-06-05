import { request } from "./client.js"

export async function registerUser(name, username, email, password) {
  return request("/auth/signup", { name, username, email, password })
}

export async function validateLogin(email, password) {
  const data = await request("/auth/login", { email, password })
  localStorage.setItem("token", data.token);
  return data.user
}

export function logout() {
  localStorage.removeItem("token");
}

export async function sendVerificationCode(email) {
  return request("/auth/send-code", { email })
}

export async function validateVerificationCode(email, code) {
  const data = await request("/auth/verify-code", { email, code })
  localStorage.setItem("token", data.token);
  return data.user
}