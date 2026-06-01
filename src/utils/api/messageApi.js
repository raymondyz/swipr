import { request } from "./client.js";

export async function getMessages(otherId) {
  return request("/message/get", { otherId })
}

export async function sendMessage(otherId, content) {
  return request("/message/send", { otherId, content })
}

export async function getAllChatUsers() {
  return request("/message/get-all-chats")
}