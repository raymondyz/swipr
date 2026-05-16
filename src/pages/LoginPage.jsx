import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateLogin, sendResetCode } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"

const Panels = Object.freeze({
  LOGIN: "registration",
  FORGOT_PASSWORD: "forgot_password",
});

function LoginPanel({setPanel, auth: {user, setUser}}) {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      console.log("Login successful")
    }
    catch (err) {
      console.log("Login failed")
      setError(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2>Login to Start Swiping!</h2>
      <form onSubmit={handleLogin}>
        <div className="emailAndPasswordBox">
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className= "bigAhhButton" type="submit">Login</button>
        </div>

      </form>

      {isLoading && <p>Loading...</p>}
      <p>{error}</p>
    </>
  )
}

function ForgotPasswordPanel({ setPanel, auth: {user, setUser} }) {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    async function handleForgotPassword(e) {
        e.preventDefault();
        setError("");
        try {
            console.log("hi");
            const fetchedUser = await getUserByEmail(email);

            await sendResetCode(email); // TODO: Test sending emails actually works
        } catch (err) {
            console.log("Reset failed")
            setError(err.message)
        }
    }

    return (
        <>
            <h2>You forgot your password</h2>
            <form onSubmit={handleForgotPassword}>
                <div className="emailAndPasswordBox">
                <label htmlFor="email">Enter your account's email:</label>
                <input
                    className="credentialsBox"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <button className= "bigAhhButton" type="submit">Reset Password</button>
                </div>

            </form>
        </>
    )
}


function LoginPage({ setPage, auth: {user, setUser} }) {
    const [panel, setPanel] = useState(Panels.LOGIN)
    

    return (
        <>
            <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
            
          
            {panel === Panels.LOGIN && <LoginPanel setPanel={setPanel} auth={{user, setUser}} />}
            {panel === Panels.FORGOT_PASSWORD && <ForgotPasswordPanel setPage={setPage} auth={{user, setUser}} />}
    
          
            <p>Don't have an account? <a onClick={() => setPage(Pages.SIGNUP)} className="url">Create Account</a></p>
            <a onClick={() => setPanel(Panels.FORGOT_PASSWORD)} className="url">Forgot password?</a>
        </>
      )
  
}

export default LoginPage