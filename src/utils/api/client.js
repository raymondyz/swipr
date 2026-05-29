const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

export async function request(path, body) {
  let res
  let data

  try {

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    if (body !== undefined) {
      options.body = JSON.stringify(body)
    }

    res = await fetch(`${BACKEND_API_URL}${path}`, options);
    data = await res.json()
  }
  catch (err) {
    throw new Error("Network or server error");
  }

  if (!res.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = res.status;
    throw error;
  }

  return data;
}

