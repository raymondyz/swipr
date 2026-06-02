import { useState } from "react"
import { SwipeAvailLabel } from "../constants/filter_avail";

import TimeTable from "../components/TimeTable";
import DiningHallRatings from "./DiningHallRatings";

import styles from "./ProfileCard.module.css";
import clsx from "clsx";


function ProfileCard({profile}) {
  const [expanded, setExpanded] = useState(false)

  const username = profile.users?.username
  const name = profile.users?.name
  const swipe_availability = profile.swipe_availability
  const location_preferences = profile.location_preferences
  const availability = profile.availability
  const notes = profile.notes

  return <>
    <div
      className={styles.profileCard}
      onClick={() => setExpanded(prev => !prev)}
      role="button"
    >
      <div className={styles.header} >
        <img src="src/assets/images/animepfp.jpg" alt="pfp" />
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