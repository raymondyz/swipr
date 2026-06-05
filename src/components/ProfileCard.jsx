import { useState } from "react"
import { SwipeAvailLabel } from "../constants/filter_avail";
import { Panels } from "../constants/pages";

import TimeTable from "../components/TimeTable";
import DiningHallRatings from "./DiningHallRatings";

import styles from "./ProfileCard.module.css";
import clsx from "clsx";


function ProfileCard({ profile, setPanel, setParams }) {
  const [expanded, setExpanded] = useState(false)

  const username = profile.users?.username
  const name = profile.users?.name
  const swipe_availability = profile.swipe_availability
  const location_preferences = profile.location_preferences
  const availability = profile.availability
  const notes = profile.notes

  function handleMessage() {
    setPanel(Panels.MESSAGE)
    setParams(prev => ({...prev, chatId: profile.user_id}))
  }

  return <>
    <div
      className={styles.profileCard}
      onClick={() => setExpanded(prev => !prev)}
      role="button"
    >
      <div className={styles.header} >
        <div className={clsx(styles.headerGroup, styles.nameGroup)}>
          <img src="/assets/images/animepfp.jpg" alt="pfp" />
          <div className={styles.nameContainer}>
            <h2>{name}</h2>
            <div className={clsx(
              styles.tag,
              swipe_availability == "offer_swipes" && styles.green,
              swipe_availability == "need_swipes" && styles.red
            )}>
              {SwipeAvailLabel[swipe_availability]}
            </div>
          </div>
        </div>
        <div className={styles.headerGroup}>
          <button
            className={styles.messageButton}
            onClick={handleMessage}
          >
            Message
          </button>
          <img
            className={clsx(styles.dropdownIcon, expanded || styles.rotated)}
            src="/assets/images/dropdown-icon.svg"
          />
        </div>
      </div>

      {expanded && (
        <div className={styles.contentContainer}>

          {availability && (
            <div className={clsx(styles.contentBlock, styles.timeTable)}>
              <h3>Availability:</h3>
              <TimeTable availability={availability}/>
            </div>
          )}

          {location_preferences && (
            <div className={styles.contentBlock}>
              <h3>Location preferences:</h3>
              <DiningHallRatings locationPref={location_preferences} condensed={true} />
            </div>
          )}

          {notes && (
            <div className={styles.contentBlock}>
              <h3>Notes:</h3>
              <p>{notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  </>
}

export default ProfileCard