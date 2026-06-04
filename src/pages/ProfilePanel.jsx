import { useState, useEffect } from "react"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail, getProfile, updateProfile } from "../utils/api/userApi"

import TimeTable from "../components/TimeTable"
import DiningHallRatings from "../components/DiningHallRatings"

import styles from "./ProfilePanel.module.css"
import clsx from "clsx"

const locationPrefDefault = Object.freeze({
  bcafe: 0,
  bplate: 0,
  cafe1919: 0,
  deneve: 0,
  epicuria: 0,
  feast: 0,
  thedrey: 0,
  thestudy: 0,
  foodtrucks: 0,
  rendevous: 0,
  bruinbowl: 0
})

const timePrefDefault = Object.freeze([
//  6am   7am   8am   9am  10am  11am  12pm   1pm   2pm   3pm   4pm   5pm   6pm   7pm   8pm   9pm  10pm  11pm 
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], // Sunday
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], // Saturday
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], // Saturday
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], // Saturday
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], // Saturday
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], // Saturday
  [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]  // Saturday
])

function ProfilePanel({ setPanel, auth: {user, setUser} }){
  const [isLoading, setIsLoading] = useState(true);
  const [locationPref, setLocationPref] = useState(locationPrefDefault);
  const [timePref, setTimePref] = useState(timePrefDefault);
  const [notes, setNotes] = useState("");
  const [swipeStatus, setSwipeStatus] = useState("");

  // Fetch user's current profile
  useEffect(() => {
    async function fetchProfile() {      
      const response = await getProfile(user.id);
      if (response) {
        setNotes(response.notes)
        setSwipeStatus(response.swipe_availability)
        setLocationPref(response.location_preferences)
        setTimePref(response.availability)
        setIsLoading(false)
      } else {
        console.error("Failed to load profile", response.error);
      }
    }
    fetchProfile();
  }, []);

  function updateAvailability(row, col, range = null) {
    setTimePref(prev => {
      if (!range || !range.original) {
        const newPref = prev.map(r => [...r]);
        newPref[row][col] = !newPref[row][col];
        return newPref;
      }

      const { startCell, currentCell, original, toggleValue } = range;
      const minDay = Math.min(startCell.dayIndex, currentCell.dayIndex);
      const maxDay = Math.max(startCell.dayIndex, currentCell.dayIndex);
      const minTime = Math.min(startCell.timeIndex, currentCell.timeIndex);
      const maxTime = Math.max(startCell.timeIndex, currentCell.timeIndex);

      return original.map((rowArr, dIndex) =>
        rowArr.map((cellValue, tIndex) =>
          dIndex >= minDay && dIndex <= maxDay && tIndex >= minTime && tIndex <= maxTime
            ? toggleValue
            : cellValue
        )
      );
    });
  }

  function handleSave() {
    updateProfile(user.id, {
      swipe_availability: swipeStatus,
      notes: notes,
      availability: timePref,
      location_preferences: locationPref
    })
  }

  // Loading screen
  if (isLoading) {
    return <p>Loading...</p>
  }

  return <>
    <div className={styles.mainContainer}>
      <div className={styles.hBlock}>
        <div className={styles.contentBlock}>
          <h2>Location Preferences:</h2>
          <DiningHallRatings
            locationPref={locationPref}
            setLocationPref={setLocationPref}
          />
        </div>
        <div className={styles.vBlock}>
          <div className={clsx(styles.contentBlock, styles.timePref)}>
            <h2>Time Availability:</h2>
            <TimeTable
              availability={timePref}
              updateAvailability={updateAvailability}
            />
          </div>
          <div className={styles.contentBlock}>
            <label htmlFor="swipe-status"><h2>Swipe Status:</h2></label>
            <select
              className={styles.credentialsBox}
              id="swipe-status"
              value={swipeStatus} 
              onChange={(e) => setSwipeStatus(e.target.value)}
            >
              <option value="offer_swipes">I can swipe others</option>
              <option value="self_swipes">I can only swipe myself</option>
              <option value="need_swipes">I need swipes</option>
            </select>
          </div>
          <div className={styles.contentBlock}>
            <label htmlFor="notes"><h2>Notes:</h2></label>
            <input
              className={styles.credentialsBox}
              id="notes"
              value={notes ?? ""}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className={styles.saveButton} onClick={handleSave}>Save</button>
    </div>
  </>
}

export default ProfilePanel