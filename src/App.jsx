import { useState } from "react"
import "./App.css"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { Pages } from "./constants/pages"
import SignupPage from "./pages/SignupPage"
import SearchPage from "./pages/SearchPage"

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(Pages.LOGIN)

  const pages = Object.keys(Pages)

  return (
    <>
    <div className="debugMenu">
      <p>[DEBUG] Logged in as: {user?.email}</p>
      <div className="pageCard">
        {pages.map(page => <button key={Pages[page]} onClick={() => setPage(Pages[page])}>{Pages[page]}</button>)}
      </div>
    </div>
      {page === Pages.LOGIN && <LoginPage setPage={setPage} auth={{ user, setUser }} />}
      {page === Pages.SIGNUP && <SignupPage setPage={setPage} auth={{ user, setUser }} />}
      {page === Pages.HOME && <HomePage setPage={setPage} auth={{ user, setUser }} />}
      {page === Pages.SEARCH && <SearchPage setPage={setPage} auth={{ user, setUser }} />}
    </>
  )
}

export default App
