import { useState, useEffect } from "react"
import "./App.css"
import { Pages } from "./constants/pages"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"

import { logout } from "./utils/api/authApi.js"
import { getUserByToken } from "./utils/api/userApi.js"


function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(Pages.LOGIN)
  const [isLoading, setIsLoading] = useState(true)

  const pages = Object.keys(Pages)


  // Auto login from local storage
  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const selfUser = await getUserByToken();
        setUser(selfUser);
        setPage(Pages.HOME)
      }
      catch {
        logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return <h1>Loading, please wait...</h1>
  }

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
    </>
  )
}

export default App
