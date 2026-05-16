const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export async function registerUser(name, username, email, password) {

  const res = await fetch(
    `${BACKEND_API_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, username, email, password })
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}

export async function validateLogin(email, password) {

  const res = await fetch(
    `${BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}

export async function sendVerificationCode(email) {

  const res = await fetch(
    `${BACKEND_API_URL}/auth/send-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}

export async function validateVerificationCode(email, code) {

  const res = await fetch(
    `${BACKEND_API_URL}/auth/verify-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, code: code })
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error)
  }

  return data
}

export async function sendResetCode(email) {
    const res = await fetch(
        `${BACKEND_API_URL}/auth/send-reset-code`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
        }
    );
}