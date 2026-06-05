import { request } from "./client.js";

export async function getUserByToken() {
  return request("/auth/me");
}

export async function getUserByEmail(email) {
  return request("/user", { email })
}

export async function getAllUserProfiles() {
  return request("/user/getAllUserProfiles")
}

export async function getProfile(userId) {
  return request("/profile/get", { userId })
}

export async function updateProfile(userId, updates) {
  return request("/profile/update", { userId, updates })
}

export async function updatePassword(oldPassword, newPassword) {
  return request("/user/update-password", { oldPassword, newPassword })
}

export async function updateUserInfo({ name, username }) {
  return request("/user/update-user-info", { name, username })
}