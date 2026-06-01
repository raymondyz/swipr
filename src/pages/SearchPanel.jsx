import { useState, useEffect } from "react";
import { getAllUserProfiles } from "../utils/api/userApi";

import ProfileCard from "../components/ProfileCard";
import { Avails } from "../constants/filter_avail";
import { filterUsers } from "../utils/dataFilter";

function SearchPanel({ setPanel, auth: {user, setUser} }) {
  const [profiles, setProfiles] = useState(null)
  const [profilesFiltered, setProfilesFiltered] = useState(null)

  const [filterSwipeAvailValue, setFilterSwipeAvailValue] = useState("null");
  const [filterLocationValue, setFilterLocationValue] = useState("null");
  const [filterTimeAvailValue, setFilterTimeAvailValue] = useState("null");
  const [filterTimeWeekday, setFilterTimeWeekday] = useState("null");
  const [filterTimeHour, setFilterTimeHour] = useState("null");

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
    setProfilesFiltered(filterUsers(profiles, {
        swipeAvail: filterSwipeAvailValue,
        location: filterLocationValue,
        timeAvail: filterTimeAvailValue,
        weekday: filterTimeWeekday,
        hour: filterTimeHour
    }));
  }

  // Loading screen
  if (!profilesFiltered) {
    return <p>Loading...</p>
  }

  return (<>
    <div style={{ alignItems: 'center' }}>
      <select
        name="swipesAvail"
        value={filterSwipeAvailValue}
        onChange={e => setFilterSwipeAvailValue(e.target.value)}
      >
        <option value="" disabled>
            Choose a swipe availability!
        </option>
        <option value={"null"} >All swipe availabilities</option>
        <option value={Avails.OFFER_SWIPES} >Offering Swipes</option>
        <option value={Avails.SELF_SWIPES} >Swiping Themselves</option>
        <option value={Avails.NEED_SWIPES} >Needs Swipes</option>
      </select>
      <select
        name="timeAvail"
        value={filterTimeAvailValue}
        onChange={e => setFilterTimeAvailValue(e.target.value)}
      >
        <option value="" disabled>
            Choose a time to meet!
        </option>
        <option value={"null"} >All times</option>
        <option value={Avails.CURRENT_TIME} >Available right now (PST)</option>
        <option value={Avails.SELECTING_HOUR} >Select an hour</option>
      </select>
      {filterTimeAvailValue === Avails.SELECTING_HOUR ?
      <div>
        <select
            name="weekday"
            value={filterTimeWeekday}
            onChange={e => setFilterTimeWeekday(e.target.value)}
        >
            <option value="" disabled>
                Select a weekday!
            </option>
            <option value={"null"} >Any weekday</option>
            {Object.entries(Avails.WEEKDAYS).map(([day, label]) => (
                <option key={day} value={label}>
                {label}
                </option>
            ))}
        </select>
        <select
            name="hour"
            value={filterTimeHour}
            onChange={e => setFilterTimeHour(e.target.value)}
        >
            <option value="" disabled>
                Select an hour!
            </option>
            <option value={"null"} >Any hour</option>
            {Object.entries(Avails.HOURS)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => (
                <option key={k} value={k}>
                {v}
                </option>
            ))}
        </select>
      </div>
      :
      <div>
        
      </div>
      }
      
    </div>
    
    <button onClick={ reloadUsers }>Apply Filters</button>
    <p>Loaded {profilesFiltered.length} profiles!</p>

    {profilesFiltered.length > 0 ?
      profilesFiltered.map(
        profile => <ProfileCard key={profile.user_id} profile={profile} />
      )
    : 
      <p>No profiles loaded!</p>
    }
  </>)

}

export default SearchPanel