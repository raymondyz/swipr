import { useState, useEffect } from "react"
import { Pages, Panels } from "../constants/pages"
import { logout, validateLogin } from "../utils/api/authApi"
import { getAllUserProfiles } from "../utils/api/userApi"
import { Avails } from "../constants/filter_avail"
import { filterUsers } from "../utils/dataFilter"

import ProfilePanel from "./ProfilePanel"
import SearchPanel from "./SearchPanel"
import DiningHallPanel from "./DiningHallPanel"

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
    <div className="homePage">
      <div className="masterHomePage">
        <div className="sideNavBar">
          <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
          <img src="src/assets/images/animepfp.jpg" alt="PFP" className="PFP"></img>
          <p>{user?.email}</p>
          <button onClick={() => setPanel(Panels.PROFILE)} className="bigAhhButton" type="submit">Profile</button>
          <button onClick={() => setPanel(Panels.SETTINGS)} className="bigAhhButton" type="submit">Settings</button>
          <button onClick={() => setPanel(Panels.SEARCH)} className="bigAhhButton" type="submit">Search</button>
          <button onClick={() => setPanel(Panels.HOME)} className="bigAhhButton" type="submit">Home</button>
          <button onClick={() => setPanel(Panels.DINING)} className="bigAhhButton" type="submit">Dining Halls</button>
          <button onClick={() => setPanel(Panels.HOME)} className="bigAhhButton" type="submit">Groups</button>
          <button onClick={() => setPanel(Panels.HOME)} className="bigAhhButton" type="submit">Messages</button>
          <button onClick={() => handleLogout()} className="bigAhhButton" type="submit">Logout</button>
        </div>
        <div className="home-panel">
          {panel === Panels.PROFILE && <ProfilePanel setPanel={setPanel} auth={{ user, setUser }} />}
          {panel === Panels.SEARCH && <SearchPanel setPanel={setPanel} auth={{ user, setUser }} />}
          {panel === Panels.DINING && <DiningHallPanel setPanel={setPanel} auth={{ user, setUser }} />}
        </div>
      </div>
    </div>
  )
}

export default HomePage