import { useState, useEffect } from "react";
import { getAllUserProfiles } from "../utils/api/userApi";

import ProfileCard from "../components/ProfileCard";
import { Avails } from "../constants/filter_avail";
import { filterUsers } from "../utils/dataFilter";

function SearchPanel({ setPanel, auth: {user, setUser} }) {
  const [profiles, setProfiles] = useState(null)
  const [profilesFiltered, setProfilesFiltered] = useState(null)

  const [filterSwipeAvailValue, setFilterSwipeAvailValue] = useState("null");
  const [filterLocationValue, setFilterLocationValue] = useState(null);
  const [filterTimeAvailValue, setFilterTimeAvailValue] = useState("null");

  useEffect(() => {
    async function fetchProfiles() {
      const response = await getAllUserProfiles();
      if (response.data) {
        setProfiles(response.data);
        setProfilesFiltered(response.data);
      } else {
        console.error("Failed to load profiles", response.error);
      }
    }
    fetchProfiles();
  }, []);

    function reloadUsers() {
        // console.log(filterSwipeAvailValue);
        // console.log(filterTimeAvailValue);
        setProfilesFiltered(filterUsers(profiles, filterSwipeAvailValue, filterLocationValue, filterTimeAvailValue));
    }

  return (
    <>
        
        {profilesFiltered ?
            <>
                <>
                    <div style={{ alignItems: 'center' }}>
                        <select name="swipesAvail" value={filterSwipeAvailValue} onChange={e => setFilterSwipeAvailValue(e.target.value)}>
                            <option value={"null"} >All swipe availabilities</option>
                            <option value={Avails.OFFER_SWIPES} >Offering Swipes</option>
                            <option value={Avails.SELF_SWIPES} >Swiping Themselves</option>
                            <option value={Avails.NEED_SWIPES} >Needs Swipes</option>
                        </select>
                        <select name="timeAvail" value={filterTimeAvailValue} onChange={e => setFilterTimeAvailValue(e.target.value)}>
                            <option value={"null"} >All times</option>
                            <option value={Avails.CURRENT_TIME} >Available right now (only in PST)</option>
                            
                        </select>
                    </div>
                    
                    
                    <button onClick={() => reloadUsers()}>Apply Filters</button>
                    <p>Loaded {profilesFiltered.length} profiles!</p>
                    {profilesFiltered.length > 0 ? profilesFiltered.map(profile => (
                        <ProfileCard key={profile.user_id} profile={profile} />
                    )) : <p>No profiles loaded!</p>}
                </>
                
            </>
        :
            <p>Loading...</p>
        }
    </>
  )

}

export default SearchPanel