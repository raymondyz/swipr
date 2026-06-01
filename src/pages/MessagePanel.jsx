import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"
import { getMessages, sendMessage } from "../utils/api/messageApi.js"
import TextMessage from "../components/TextMessage.jsx"

import styles from "./MessagePanel.module.css"
import clsx from "clsx"


function MessageSidebar({ chatUserId, setChatUserId, fetchMessages }) {
  return <>
    <div className={styles.sidebarContainer} >
      <button onClick={() => setChatUserId("7ee5a007-5dae-4e65-b62c-d6326f8b983b")}>Kenneth</button>
      <button onClick={() => setChatUserId("1cfca496-8341-4d18-833b-807f3d66ba1c")}>Raymond</button>
    </div>
  </>
}

function MessageHistory({ data, user }) {
  return <>
    <div className={styles.historyContainer} >
      {data?.map(message => 
        <TextMessage
          key={message.id}
          content={message.content}
          ownMessage={message.sender_id === user.id}
        />
      )}
    </div>
  </>
}

function MessageBar({ chatUserId, fetchMessages }) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    await sendMessage(chatUserId, message)
    await fetchMessages()
    setMessage("")
  }

  return <>
    <div className={styles.messageBar}>
      <input
        className={styles.composeBox}
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
      >Send</button>
    </div>
  </>
}


function MessagePanel({ setPage, auth: {user, setUser} }) {
  const [data, setData] = useState(null);
  const [chatUserId, setChatUserId] = useState("");

  async function fetchMessages() {
    const messages = await getMessages(chatUserId)
    setData(messages)
  }

  // Fetch message from when chat changes
  useEffect(() => {
    if (!chatUserId) return;

    fetchMessages(chatUserId, setData);
  }, [chatUserId]);


  // Fetch message every 5 seconds
  useEffect(() => {
    if (!chatUserId) return;

    const id = setInterval(() => {
      fetchMessages();
    }, 5 * 1000);

    return () => {clearInterval(id)};
  }, [chatUserId]);

  return <>
    <div className={styles.mainContainer} >
      <MessageSidebar
        chatUserId={chatUserId}
        setChatUserId={setChatUserId}
        fetchMessages={fetchMessages}
      />
      {chatUserId !== "" &&
        <div className={styles.chatWindow} >
          <MessageHistory data={data} user={user} />
          <MessageBar
            chatUserId={chatUserId}
            fetchMessages={fetchMessages}
          />
        </div>
      }
    </div>
  </>
  
}

export default MessagePanel