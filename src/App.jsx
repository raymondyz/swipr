import { useState } from "react"
import "./App.css"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { Pages } from "./constants/pages"
import SignupPage from "./pages/SignupPage"

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(Pages.LOGIN)

  return (
    <>
    <div className="debugMenu">
      <p>[DEBUG] Logged in as: {user?.email}</p>
      <div className="pageCard">
          <button onClick={() => setPage(Pages.LOGIN)}>Login Page</button>
          <button onClick={() => setPage(Pages.SIGNUP)}>Signup Page</button>
          <button onClick={() => setPage(Pages.HOME)}>Home Page</button>
      </div>
    </div>
        {page === Pages.LOGIN && <LoginPage setPage={setPage} auth={{ user, setUser }} />}
        {page === Pages.SIGNUP && <SignupPage setPage={setPage} auth={{ user, setUser }} />}
        {page === Pages.HOME && <HomePage setPage={setPage} auth={{ user, setUser }} />}
    </>
  )
}

export default App
