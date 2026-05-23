import { useState } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"

function LoginPage({ setPage, auth: {user, setUser} }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const eyeToggle = () => {
    console.log("eye toggled");
    setPassword(!password);
  }
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
    <div className="loginCard">
      <div className="pageCard">
          <button onClick={() => setPage(Pages.LOGIN)}>Login Page</button>
          <button onClick={() => setPage(Pages.SIGNUP)}>Signup Page</button>
      </div>
      <div className="loginInfoBox">
        <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
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
              type = {password ? "password":"text"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button class="buttonHidden" type="button" onClick={eyeToggle} style={{outline:'none'}} ><img src="src/assets/images/eye.png" style={{width:'20px',height:'20px'}}/></button>
            <button className= "bigAhhButton" type="submit">Login</button>
          </div>

        </form>

        {isLoading && <p>Loading...</p>}
        <p>{error}</p>

        <p>Don't have an account? <a onClick={() => setPage(Pages.SIGNUP)}>Create Account</a></p>
      </div>
    </div>

  )
}

export default LoginPage