import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"
import { getMessages, sendMessage } from "../utils/api/messageApi.js"


function MessagePanel({ setPage, auth: {user, setUser} }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function test() {
      const messages = await getMessages("7ee5a007-5dae-4e65-b62c-d6326f8b983b")
      setData(messages)
    }
    test();
  }, []);

  if (!data) {
    return;
  }
  
  return <>
    {data.map(e => <p>{e.content}</p>)}
  </>
}

export default MessagePanel