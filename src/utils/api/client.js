const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

function getToken() {
  return localStorage.getItem("token");
}

export async function request(path, body) {
  const token = getToken();
  let res
  let data

  try {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
    if (body !== undefined) {
      options.body = JSON.stringify(body)
    }

    res = await fetch(`${BACKEND_API_URL}${path}`, options);
    data = await res.json()
  }
  catch (err) {
    console.log(err)
    throw new Error("Network or server error");
  }

  if (!res.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = res.status;
    throw error;
  }

  return data;
}

