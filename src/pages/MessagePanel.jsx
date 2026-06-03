import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"
import { getMessages, sendMessage, getAllChatUsers } from "../utils/api/messageApi.js"
import TextMessage from "../components/TextMessage.jsx"

import styles from "./MessagePanel.module.css"
import clsx from "clsx"


function MessageSidebar({ chatUserId, setChatUserId, chatList }) {
  return <>
    <div className={styles.sidebarContainer} >
      {chatList.map(user =>
        <button
          className={clsx(styles.chatButton, user.id === chatUserId && styles.selectedChat)}
          key={user.id}
          onClick={() => setChatUserId(user.id)}
        >
          <p className={styles.name}>{user.name}</p>
          <p className={styles.username}>{user.username}</p>
        </button>
      )}
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

  async function handleSend(e) {
    e.preventDefault();

    if (message.trim().length === 0) return;
    
    await sendMessage(chatUserId, message)
    await fetchMessages()
    setMessage("")
  }

  return <>
    <form
      className={styles.messageBar}
      onSubmit={handleSend}
    >
      <input
        className={styles.composeBox}
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <button
        className={styles.sendButton}
        type="submit"
      >Send</button>
    </form>
  </>
}


function MessagePanel({ params, setParams, setPage, auth: {user, setUser} }) {
  const [data, setData] = useState(null);
  const [chatUserId, setChatUserId] = useState(params?.chatId ?? null);
  const [chatList, setChatList] = useState([]);
  
  // Clear params
  useEffect(() => {
    if (params) setParams(null);
  }, []);

  async function fetchMessages() {
    const messages = await getMessages(chatUserId)
    setData(messages)
  }

  // Fetch message from when chat changes
  useEffect(() => {
    if (!chatUserId) return;

    fetchMessages(chatUserId, setData);
  }, [chatUserId]);

  // Fetch all chats
  useEffect(() => {
    async function fetchChats() {
      setChatList(await getAllChatUsers());
    }
    fetchChats();
  }, [])

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
        chatList={chatList}
      />
      {chatUserId &&
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