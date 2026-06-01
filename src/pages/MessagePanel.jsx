import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"
import { getMessages, sendMessage } from "../utils/api/messageApi.js"
import TextMessage from "../components/TextMessage.jsx"

import styles from "./MessagePanel.module.css"
import clsx from "clsx"


function MessageSidebar({ receiverId, setReceiverId }) {
  return <>
    <div className={styles.sidebarContainer} >

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

function MessageBar() {
  return <>
    <div className={styles.messageBar}>
      <input className={styles.composeBox}/>
      <button className={styles.sendButton}>Send</button>
    </div>
  </>
}


function MessagePanel({ setPage, auth: {user, setUser} }) {
  const [data, setData] = useState(null);
  const [receiverId, setReceiverId] = useState("7ee5a007-5dae-4e65-b62c-d6326f8b983b");

  useEffect(() => {
    async function test() {
      console.log(user.id)
      const messages = await getMessages(receiverId)
      setData(messages)
    }
    test();
  }, []);

  if (!data) {
    return;
  }

  console.log(data)

  return <div className={styles.mainContainer} >
    <MessageSidebar />
    <div className={styles.chatWindow} >
      <MessageHistory data={data} user={user} />
      <MessageBar />
    </div>
  </div>
  
}

export default MessagePanel