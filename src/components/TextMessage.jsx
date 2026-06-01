import styles from "./TextMessage.module.css";
import clsx from "clsx";

function TextMessage({content, ownMessage}) {
  const justifyContent = ownMessage ? "flex-end" : "flex-start"
  return (
    <div className={clsx(styles.messageLine, ownMessage && styles.ownMessage)} >
      <div className={styles.messageBubble} >
        <p>{content}</p>
      </div>
    </div>
  )
}

export default TextMessage