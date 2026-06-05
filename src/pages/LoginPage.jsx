import { useState } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"
import { EyeToggleButton } from "../components/eyeToggleButton.jsx"

import styles from "./LoginPage.module.css"

function LoginPage({ setPage, auth: {user, setUser} }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate login
    try {
      await validateLogin(email, password)
      
      // Login successful

      const fetchedUser = await getUserByEmail(email)
      setUser(fetchedUser)

      // Check if user is verified yet
      if (fetchedUser.is_verified) {
        setPage(Pages.HOME)
      }
      else {
        setPage(Pages.SIGNUP)
      }
    }
    catch (err) {
      setError(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <img src="/assets/images/swiprLogo.svg" alt="Logo"></img>
        <h2>Login to Start Swiping!</h2>
        
        <form onSubmit={handleLogin}>
          <div className={styles.credentialsContainer}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type = {showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeToggleButton showPassword={showPassword} setShowPassword={setShowPassword} styles={styles} />
            <button type="submit">Login</button>
          </div>

        </form>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className={styles.switchPageText}>
          <p>Don't have an account?</p>
          <a onClick={() => setPage(Pages.SIGNUP)}>Create Account</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage