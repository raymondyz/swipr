import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateSignupEmail, validateSignupPassword, passwordRequirements } from "../utils/authValidation"
import { registerUser, sendVerificationCode, validateVerificationCode } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"

const Panels = Object.freeze({
  REGISTRATION: "registration",
  EMAIL_VERIFICATION: "EMAIL_verification",
});


function RegistrationPanel({ setPanel, auth: {user, setUser} }) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const eyeToggle = () => {
    console.log("eye toggled");
    setPassword(!password);
  }
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
      await registerUser(name, username, email, password)

      // Register successful
      setUser(await getUserByEmail(email))
      console.log("Registration successful")
      setPanel(Panels.EMAIL_VERIFICATION)
    }
    catch (err) {
      setError(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>   
        <form onSubmit={handleSignup}>
          <div className="emailAndPasswordBox">
            <label htmlFor="name">Name:</label>
            <input
              className="credentialsBox"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="username">Username:</label>
            <input
              className="credentialsBox"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              className="credentialsBox"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              className="credentialsBox"
              id="password"
              type={password ? "password":"text"}
              onChange={(e) => setPassword(e.target.value)}
            />
             
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              className="credentialsBox"
              id="confirm-password"
               type={password ? "password":"text"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button class="buttonHidden" type="button" onClick={eyeToggle} style={{outline:'none'}} ><img src="src/assets/images/eye.png" style={{width:'20px',height:'20px'}}/></button>
            <button className="bigAhhButton" type="submit">Signup</button>
          </div>

          </form>

        {isLoading && <p>Loading...</p>}
        <p>{error}</p>
    </>
  )
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
      console.log("Verification successful")
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
            <label htmlFor="code">Code:</label>
            <input
              id="code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{error}</p>
          <p>Please check your spam folder!</p>
          <p>Didn't get a code? <a onClick={handleSendCode}>Resend</a></p>
        </>
      ) : (
        <>
          <h2>Verify Your Email: {user.email}</h2>
          <button onClick={handleSendCode}>Send Code</button>
          <p>{error}</p>
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
    <div className="loginCard">
      <div className="pageCard">
          <button onClick={() => setPage(Pages.LOGIN)}>Login Page</button>
          <button onClick={() => setPage(Pages.SIGNUP)}>Signup Page</button>
      </div>
      <div className="loginInfoBox">
        <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
          <h2>Create an Account to Start Swiping!</h2>
          
          {panel === Panels.REGISTRATION && <RegistrationPanel setPanel={setPanel} auth={{user, setUser}} />}
          {panel === Panels.EMAIL_VERIFICATION && <VerificationPanel setPage={setPage} auth={{user, setUser}} />}

          <p>Already have an account? <a onClick={() => setPage(Pages.LOGIN)}>Login</a></p>
      </div>
    </div>
  )
}

export default SignupPage