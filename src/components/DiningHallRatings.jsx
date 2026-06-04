import StarRating from "./StarRating"

import styles from "./DiningHallRatings.module.css"
import clsx from "clsx"

function DiningHall({ rating, onRate, locationImgPath, locationName, condensed }) {
  return <>
    <div className={clsx(styles.diningHallRating, condensed && styles.condensed)}>
      {/* {condensed ? (
        <h3 className={styles.diningHallName}>{locationName}</h3>
      ) : (
        <img
          src={locationImgPath}
          alt={locationName}
        />
      )} */}
      <h3 className={styles.diningHallName}>{locationName}</h3>
      <StarRating
        rating={rating}
        onRate={onRate}
      />
      {condensed || <h3>Rating: {rating}/5</h3>}
    </div>
  </>
}

const locations = Object.freeze({
  bcafe: "BCafe",
  bplate: "BPlate",
  cafe1919: "Cafe 1919",
  deneve: "De Neve",
  epicuria: "Epicuria",
  feast: "Feast",
  thedrey: "The Drey",
  thestudy: "The Study",
  foodtrucks: "Food Trucks",
  rendevous: "Rendevous",
  bruinbowl: "Bruin Bowl"
})

const locImgPaths = Object.freeze({
  bcafe: "/swipr/assets/images/bcafe.png",
  bplate: "/swipr/assets/images/bplate.png",
  cafe1919: "/swipr/assets/images/cafe1919.png",
  deneve: "/swipr/assets/images/deneve.png",
  epicuria: "/swipr/assets/images/epicuria.png",
  feast: "/swipr/assets/images/feast.png",
  thedrey: "/swipr/assets/images/thedrey.svg",
  thestudy: "/swipr/assets/images/thestudy.png",
  foodtrucks: "/swipr/assets/images/foodtrucks.svg",
  rendevous: "/swipr/assets/images/rendevous.svg",
  bruinbowl: "/swipr/assets/images/bruinbowl.svg"
})

function DiningHallRatings({ locationPref, setLocationPref = null, condensed = false}) {
  return <>
    <div className={clsx(styles.diningHallsContainer, condensed && styles.condensed)}>
      {Object.keys(locations).map(loc => (
        <DiningHall
          key={loc}
          rating={locationPref[loc]}
          onRate={(val) => setLocationPref(prev => {
            // Ignore if view only
            if (setLocationPref === null) return;

            const newPref = {...prev}
            newPref[loc] = val
            return newPref
          })}
          locationImgPath={locImgPaths[loc]}
          locationName={locations[loc]}
          condensed={condensed}
        />
      ))}
    </div>
  </>
}

export default DiningHallRatings