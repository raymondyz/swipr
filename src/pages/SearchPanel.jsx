import { useState, useEffect } from "react";
import { getAllUserProfiles } from "../utils/api/userApi";

import ProfileCard from "../components/ProfileCard";
import { Avails, SwipeAvailLabel } from "../constants/filter_avail";
import { filterUsers } from "../utils/dataFilter";

import styles from "./SearchPanel.module.css";

function SearchPanel({ setPanel, setParams, auth: {user, setUser} }) {
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

  return <>
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.filterRow}>
          <select
            name="swipesAvail"
            value={filterSwipeAvailValue}
            onChange={e => setFilterSwipeAvailValue(e.target.value)}
          >
            <option value="" disabled>Choose a swipe availability!</option>
            <option value={"null"} >All</option>
            {Object.keys(SwipeAvailLabel).map(e => 
              <option key={e} value={e} >{SwipeAvailLabel[e]}</option>
            )}
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
        </div>
        {filterTimeAvailValue === Avails.SELECTING_HOUR &&
          <div className={styles.filterRow}>
            <p>Hour:</p>
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
        }
        <button onClick={ reloadUsers }>Apply Filters</button>
      </div>
      
      <div className={styles.profilesContainer}>
        <p>Loaded {profilesFiltered.length} profiles!</p>
        {profilesFiltered.length > 0 ?
          profilesFiltered.map(profile => (
            <ProfileCard
              key={profile.user_id}
              profile={profile}
              setPanel={setPanel}
              setParams={setParams}
            />
          ))
        : 
          <p>No profiles loaded!</p>
        }
      </div>

    </div>
  </>

}

export default SearchPanel