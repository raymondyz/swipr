import { useState, useEffect } from "react"
import { Pages, Panels } from "../constants/pages"
import { logout, validateLogin } from "../utils/api/authApi"
import { getAllUserProfiles } from "../utils/api/userApi"
import { Avails } from "../constants/filter_avail"
import { filterUsers } from "../utils/dataFilter"

import ProfilePanel from "./ProfilePanel"
import SearchPanel from "./SearchPanel"
import DiningHallPanel from "./DiningHallPanel"
import MessagePanel from "./MessagePanel"

import styles from "./HomePage.module.css"

function HomePage({ setPage, auth: {user, setUser}  }) {
  const [panel, setPanel] = useState(Panels.HOME);

  function handleLogout() {
    logout()
    setUser(null)
    setPage(Pages.LOGIN)
  }

  // Send user to login if not logged in
  useEffect(() => {
    if (!user) setPage(Pages.LOGIN);
  }, [user]);

  return (
    <div className={styles.homePage}>
      <div className={styles.navbar}>
        <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
        <img src="src/assets/images/animepfp.jpg" alt="PFP" className="PFP"></img>
        <p>{user?.email}</p>
        <div className={styles.navContainer}>
          <button onClick={() => setPanel(Panels.PROFILE)} type="submit">Profile</button>
          <button onClick={() => setPanel(Panels.SETTINGS)} type="submit">Settings</button>
          <button onClick={() => setPanel(Panels.SEARCH)} type="submit">Search</button>
          <button onClick={() => setPanel(Panels.HOME)} type="submit">Home</button>
          <button onClick={() => setPanel(Panels.DINING)} type="submit">Dining Halls</button>
          <button onClick={() => setPanel(Panels.HOME)} type="submit">Groups</button>
          <button onClick={() => setPanel(Panels.MESSAGE)} type="submit">Messages</button>
          <button onClick={() => handleLogout()} type="submit">Logout</button>
        </div>
      </div>
      <div className={styles.panelContainer}>
        {panel === Panels.PROFILE && <ProfilePanel setPanel={setPanel} auth={{ user, setUser }} />}
        {panel === Panels.SEARCH && <SearchPanel setPanel={setPanel} auth={{ user, setUser }} />}
        {panel === Panels.DINING && <DiningHallPanel setPanel={setPanel} auth={{ user, setUser }} />}
        {panel === Panels.MESSAGE && <MessagePanel setPanel={setPanel} auth={{ user, setUser }} />}
      </div>
    </div>
  )
}

export default HomePage