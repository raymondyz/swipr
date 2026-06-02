import { useState } from 'react'
import { SwipeAvailLabel } from "../constants/filter_avail";

import styles from "./ProfileCard.module.css"; 


function ProfileCard({profile}) {
  const [expanded, setExpanded] = useState(false)

  const username = profile.users?.username
  const name = profile.users?.name
  const swipe_availability = profile.swipe_availability
  const location_preferences = profile.location_preferences
  const availability = profile.availability
  const notes = profile.notes

  return (
    <div
      onClick={() => setExpanded(prev => !prev)}
      role="button"
    >
      <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
        <img src="src/assets/images/animepfp.jpg" alt="pfp" style={{height: "60px", width: "auto"}}></img>
        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
          <h2>{name}</h2>
          {/* <p>{username}</p> Why do we need to show this in the search panel? */}
          <h2>Swipe: {swipe_availability}</h2>
        </div>
      </div>

      {expanded && (
        <div className={styles.expandedInfo}>
          {location_preferences && (
            <div>
              <p>Location preferences:</p>
              <ul>
                {Object.keys(location_preferences).map(location => (
                  <p>{location}</p>
                ))}
              </ul>
            </div>
          )}

          {availability && (
            <div>
              <p>Availability:</p>
              <ul>
                {Object.keys(availability).map(availability => (
                  <p>{availability}</p>
                ))}
              </ul>
            </div>
          )}

          {notes && (
            <div>
              <p>Notes:</p>
              <p>{notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
  
  // return <>
  //   <div className={styles.profileCard}>
  //     <div className={styles.contentBlock}>
  //       <div className={styles.nameContainer}>
  //         <h2 className={styles.name}>{name}</h2>
  //         <p className={styles.username}>{username}</p>
  //       </div>
  //       <h3>{SwipeAvailLabel[swipe_availability]}</h3>
  //     </div>
  //     <div className={styles.contentBlock}>
  //       {location_preferences && Object.keys(location_preferences).map(location => <p>{location}</p>)}
  //     </div>
  //   </div>
  // </>
}

export default ProfileCard