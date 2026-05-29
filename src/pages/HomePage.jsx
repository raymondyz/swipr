import { useState, useEffect } from "react"
import { Pages, Panels } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getAllUserProfiles } from "../utils/api/userApi"
import { Avails } from "../constants/swipe_avail"
import { filterUsers } from "../utils/dataFilter"

import ProfilePanel from "./ProfilePanel"
import SearchPanel from "./SearchPanel"

function HomePage({ setPage, auth: {user, setUser}  }) {
  const [name, setName] = useState("")
  const [panel, setPanel] = useState(Panels.HOME);

  const [data, setData] = useState(null); // "this is caching" - raymond
  const [dataRender, setDataRender] = useState(null);

  const [filterSwipeAvailValue, setFilterSwipeAvailValue] = useState(null);
  const [filterLocationValue, setFilterLocationValue] = useState(null);
  const [filterTimeAvailValue, setFilterTimeAvailValue] = useState(null);

  

  // Send user to login if not logged in
  useEffect(() => {
    if (!user) setPage(Pages.LOGIN);
  }, [user]);

  useEffect(() => {
    async function fetchProfiles() {
        const response = await getAllUserProfiles();
        if (response.data) {
            setData(response.data);
            setDataRender(response.data);
            console.log("hi");
        } else {
            console.error("Failed to load profiles", response.error);
        }
    }
    fetchProfiles();
    
  }, []); // no dependencies --> run once. Reloads on browser refresh

    function reloadUsers() {
        console.log(filterSwipeAvailValue);
        setDataRender(filterUsers(data, filterSwipeAvailValue, filterLocationValue, filterTimeAvailValue));
    }

  if (!user){
    return (<h2>You are not currently logged in yet...</h2>)
  }
  return (
    <div className="homePage">
      <div className="masterHomePage">
        <div className="sideNavBar">
          <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
          <img src="src/assets/images/animepfp.jpg" alt="PFP" className="PFP"></img>
          <p>[DEBUG] Logged in as: {user?.email}</p>
          <button onClick={() => setPanel(Panels.PROFILE)} className= "bigAhhButton" type="submit">Profile</button>
          <button onClick={() => setPanel(Panels.SETTINGS)} className= "bigAhhButton" type="submit">Settings</button>
          <button onClick={() => setPanel(Panels.SEARCH)} className= "bigAhhButton" type="submit">Search</button>
          
          <button onClick={() => setPanel(Panels.HOME)} className= "bigAhhButton" type="submit">Home</button>
          <button onClick={() => setPanel(Panels.DINING)} className= "bigAhhButton" type="submit">Dining Halls</button>
          <button onClick={() => setPanel(Panels.HOME)} className= "bigAhhButton" type="submit">Groups</button>
          <button onClick={() => setPanel(Panels.HOME)} className= "bigAhhButton" type="submit">Messages</button>
        </div>
        <div className="home-panel">
        {panel === Panels.HOME && <div className="homePageContent">
            <h2>Welcome {user.name}!</h2> 
            {dataRender ? (
                <>
                    <select name="swipesAvail" value={filterSwipeAvailValue} onChange={e => setFilterSwipeAvailValue(e.target.value)}>
                        <option value={"null"} >All swipe availabilities</option>
                        <option value={Avails.OFFER_SWIPES} >Offering Swipes</option>
                        <option value={Avails.SELF_SWIPES} >Swiping Themselves</option>
                        <option value={Avails.NEED_SWIPES} >Needs Swipes</option>
                    </select>
                    
                    <button onClick={() => reloadUsers()}>Apply Filters</button>
                    <p>Loaded {dataRender.length} profiles!</p>
                    <p>{JSON.stringify(dataRender)}</p>
                </>
                
            ) : (
                <p>Loading profiles...</p>
            )}
        </div>}
        {panel === Panels.PROFILE && <ProfilePanel setPanel={setPanel} auth={{ user, setUser }} />}
        {panel === Panels.SEARCH && <SearchPanel setPanel={setPanel} auth={{ user, setUser }} />}
        
        
      </div>
      </div>
    </div>
  )
}

export default HomePage