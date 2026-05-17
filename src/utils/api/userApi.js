const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export async function getUserByEmail(email) {

  const res = await fetch(
    `${BACKEND_API_URL}/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    }
  );

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data;
}

export async function getAllUserProfiles() {

  const res = await fetch(
    `${BACKEND_API_URL}/user/getAllUserProfiles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data;
}