import { useState } from "react"
import { updateUserInfo, updatePassword } from "../utils/api/userApi"
import { validateSignupPassword, passwordRequirements } from "../utils/authValidation"

import styles from "./SettingsPanel.module.css"
import clsx from "clsx"


function SettingsPanel({ auth: { user, setUser } }) {
  // User info
  const [newName, setNewName] = useState(user?.name ?? "")
  const [newUsername, setNewUsername] = useState(user?.username ?? "")
  const [infoError, setInfoError] = useState("")
  const [infoSuccess, setInfoSuccess] = useState("")

  // Password
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  async function handleUpdateInfo() {
    setInfoError("")
    setInfoSuccess("")

    try {
      if (newName == "") {
        setInfoError("New name cannot be blank!")
        return
      }

      if (newName.length > 30) {
        setInfoError("New name is too long! Max 30 characters.")
        return
      }

      if (newUsername == "") {
        setInfoError("New username cannot be blank!")
        return
      }

      if (newUsername.length > 30){
        setInfoError("New username is too long! Max 30 characters.")
        return
      }

      const newUser = await updateUserInfo({ name: newName, username: newUsername })

      // Success
      setNewName(newUser.name)
      setNewUsername(newUser.username)
      setUser(newUser)
      setInfoSuccess("Info updated successfully!")
    }
    catch (err) {
      setInfoError(err.message)
    }
  }

  async function handleUpdatePassword() {
    setPasswordError("")
    setPasswordSuccess("")

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords don't match!")
      return;
    }

    if (!validateSignupPassword(newPassword)) {
      setPasswordError(passwordRequirements)
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword)

      // Success
      setOldPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      setPasswordSuccess("Password updated successfully!")
    }
    catch (err) {
      setPasswordError(err.message)
    }
  }

  return <>
    <div className={styles.mainContainer}>
      <div className={clsx(styles.section, styles.updateInfo)}>
        <h2>Update Info:</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name"><p>Name:</p></label>
          <input
            id="name"
            onChange={e => setNewName(e.target.value)}
            value={newName}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="username"><p>Username:</p></label>
          <input
            id="username"
            onChange={e => setNewUsername(e.target.value)}
            value={newUsername}
          />
        </div>
        
        <button onClick={handleUpdateInfo}>Update Info</button>

        {infoError && <p className={styles.error}>{infoError}</p>}
        {infoSuccess && <p className={styles.success}>{infoSuccess}</p>}

      </div>
      <div className={clsx(styles.section, styles.updatePassword)}>
        <h2>Update Password:</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="oldPassword"><p>Old Password:</p></label>
          <input
            id="oldPassword"
            onChange={e => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="newPassword"><p>New Password:</p></label>
          <input
            id="newPassword"
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="confirmNewPassword"><p>Confirm New Password:</p></label>
          <input
            id="confirmNewPassword"
            onChange={e => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
          />
        </div>

        <button onClick={handleUpdatePassword}>Change Password</button>

        {passwordError && <p className={styles.error}>{passwordError}</p>}
        {passwordSuccess && <p className={styles.success}>{passwordSuccess}</p>}
      </div>
    </div>
  </>
}

export default SettingsPanel