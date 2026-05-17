import { useState, useEffect } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getAllUserProfiles } from "../utils/api/userApi"

import ProfilePage from "./ProfilePage"

function HomePage({ setPage, auth: {user, setUser}  }) {
  const [name, setName] = useState("")
  const [page2, setPage2] = useState(Pages.HOME);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchProfiles() {
        const response = await getAllUserProfiles();
        if (response.data) {
            setData(response.data);
        } else {
            console.error("Failed to load profiles", response.error);
        }
    }
    fetchProfiles();
  }, []); // no dependencies --> run once. Reloads on browser refresh

  if (!user){
    return (<h2>You are not currently logged in yet... (also it should be impossible to get to this page lul)</h2>)
  }
  return (
    <div className="homePage">
      <div className="masterHomePage">
        <div className="sideNavBar">
          <img src="src/assets/images/swiprLogo.png" alt="Logo" className="Logo"></img>
          <img src="src/assets/images/animepfp.jpg" alt="PFP" className="PFP"></img>
          <p>[DEBUG] Logged in as: {user?.email}</p>
          <button onClick={() => setPage2(Pages.PROFILE)} className= "bigAhhButton" type="submit">Profile</button>
          <button onClick={() => setPage2(Pages.HOME)} className= "bigAhhButton" type="submit">Settings</button>
          
          <button onClick={() => setPage2(Pages.HOME)} className= "bigAhhButton" type="submit">Home</button>
          <button onClick={() => setPage2(Pages.HOME)} className= "bigAhhButton" type="submit">Dining Halls</button>
          <button onClick={() => setPage2(Pages.HOME)} className= "bigAhhButton" type="submit">Groups</button>
          <button onClick={() => setPage2(Pages.HOME)} className= "bigAhhButton" type="submit">Messages</button>
        </div>
        {page2 === Pages.HOME && <div className="homePageContent">
            <h2>Welcome {user.name}!</h2> 
            {data ? (
                <>
                    <p>Loaded {data.length} profiles!</p>
                    <p>{JSON.stringify(data)}</p>
                </>
                
            ) : (
                <p>Loading profiles...</p>
            )}
        </div>}
        {page2 === Pages.PROFILE && <ProfilePage setPage={setPage2} auth={{ user, setUser }} />}
        
        
      </div>
    </div>
  )
}

export default HomePage