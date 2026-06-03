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
  const [panelParams, setPanelParams] = useState(null);

  function handleLogout() {
    logout()
    setUser(null)
    setPage(Pages.LOGIN)
  }

  // Send user to login if not logged in
  useEffect(() => {
    if (!user) setPage(Pages.LOGIN);
  }, [user]);

  const panelProps = {
    params: panelParams,
    setParams: setPanelParams,
    setPanel,
    auth: { user, setUser }
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.navbar}>
        <img src="src/assets/images/swiprLogoWhite.svg" alt="Logo"></img>
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
        {panel === Panels.PROFILE && <ProfilePanel {...panelProps} />}
        {panel === Panels.SEARCH && <SearchPanel {...panelProps} />}
        {panel === Panels.DINING && <DiningHallPanel {...panelProps} />}
        {panel === Panels.MESSAGE && <MessagePanel {...panelProps} />}
      </div>
    </div>
  )
}

export default HomePage