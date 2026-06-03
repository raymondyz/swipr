import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateSignupEmail, validateSignupPassword, passwordRequirements } from "../utils/authValidation"
import { registerUser, sendVerificationCode, validateVerificationCode } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"

import styles from "./LoginPage.module.css"

const Panels = Object.freeze({
  REGISTRATION: "registration",
  EMAIL_VERIFICATION: "EMAIL_verification",
});

function RegistrationPanel({ setPanel, auth: {user, setUser} }) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (name == "") {
      setError("Name cannot be blank!")
      setIsLoading(false)
      return
    }

    if (username == "") {
      setError("Username cannot be blank!")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      setIsLoading(false)
      return
    }

    if (!validateSignupEmail(email)) {
      setError("Email address is not valid!")
      setIsLoading(false)
      return
    }

    if (!validateSignupPassword(password)) {
      setError(passwordRequirements)
      setIsLoading(false)
      return
    }

    // Try to register user
    try {
      const newUser = await registerUser(name, username, email, password)

      // Register successful
      setUser(newUser)
      setPanel(Panels.EMAIL_VERIFICATION)
    }
    catch (err) {
      setError(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return <>   
    <form onSubmit={handleSignup}>
      <div className={styles.credentialsContainer}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
          
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          id="confirm-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className={styles.hideToggle}
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
        >
          <img
            src={`src/assets/images/${showPassword ? "eye-open" : "eye-hidden"}.png`}
          />
        </button>
        <button type="submit">Signup</button>
      </div>
    </form>

    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}
  </>
}

function VerificationPanel({ setPage, auth: {user, setUser} }) {
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  if (!user) {
    return <h2>Loading account details...</h2>
  }

  async function handleSendCode() {
    setError("")
    try {
      await sendVerificationCode(user.email)
      if (!isCodeSent) {
        setIsCodeSent(true)
      }
    }
    catch (err) {
      setError(err.message)
    }
  }

  async function handleCodeSubmit(e) {
    e.preventDefault()

    setError("")
    try {
      await validateVerificationCode(user.email, code)
      setPage(Pages.HOME)
    }
    catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      {isCodeSent ? (
        <>
          <form onSubmit={handleCodeSubmit}>
            <div className={styles.credentialsContainer}>
              <label htmlFor="code">Code:</label>
              <input
                id="code"
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit">Submit</button>
            </div>
          </form>
          {error && <p>{error}</p>}
          <p>Please check your spam folder!</p>
          <div className={styles.switchPageText}>
            <p>Didn't get a code?</p>
            <a onClick={handleSendCode}>Resend</a>
          </div>
        </>
      ) : (
        <>
          <h2>Verify Your Email: {user.email}</h2>
          <button onClick={handleSendCode}>Send Code</button>
          {error && <p>{error}</p>}
        </>
      )}
    </>
  )
}

function SignupPage({ setPage, auth: {user, setUser} }) {
  const [panel, setPanel] = useState(Panels.REGISTRATION)

  useEffect(() => {
    if (!user) return
    if (!user.is_verified) {
      setPanel(Panels.EMAIL_VERIFICATION)
    }
  }, [user])

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <img src="src/assets/images/swiprLogo.svg" alt="Logo"></img>
          <h2>Sign Up to Start Swiping!</h2>
          
          {panel === Panels.REGISTRATION && <RegistrationPanel setPanel={setPanel} auth={{user, setUser}} />}
          {panel === Panels.EMAIL_VERIFICATION && <VerificationPanel setPage={setPage} auth={{user, setUser}} />}

          <div className={styles.switchPageText}>
            <p>Already have an account?</p>
            <a onClick={() => setPage(Pages.LOGIN)}>Login</a>
          </div>
      </div>
    </div>
  )
}

export default SignupPage