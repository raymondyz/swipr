import { request } from "./client.js";

export async function getMessages(otherId) {
  return request("/message/get", { otherId })
}

export async function sendMessage(otherId, content) {
  return request("/message/send", { otherId, content })
}