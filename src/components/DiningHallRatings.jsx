import StarRating from "./StarRating"

import styles from "./DiningHallRatings.module.css"

function DiningHall({ rating, onRate, locationImgPath, locationName }) {
  return <>
    <div className={styles.diningHallRating}>
      <img
        src={locationImgPath}
        alt={locationName}
      />
      <StarRating
        rating={rating}
        onRate={onRate}
      />
      <h3>Rating: {rating}/5</h3>
    </div>
  </>
}

const locations = Object.freeze({
  bcafe: "BCafe",
  bplate: "BPlate",
  cafe1919: "Cafe1919",
  deneve: "DeNeve",
  epicuria: "Epicuria",
  feast: "Feast",
  thedrey: "TheDrey",
  thestudy: "TheStudy",
  foodtrucks: "FoodTrucks",
  rendevous: "Rendevous",
  bruinbowl: "BruinBowl"
})

const locImgPaths = Object.freeze({
  bcafe: "src/assets/images/bcafe.png",
  bplate: "src/assets/images/bplate.png",
  cafe1919: "src/assets/images/cafe1919.png",
  deneve: "src/assets/images/deneve.png",
  epicuria: "src/assets/images/epicuria.png",
  feast: "src/assets/images/feast.png",
  thedrey: "src/assets/images/thedrey.svg",
  thestudy: "src/assets/images/thestudy.png",
  foodtrucks: "src/assets/images/foodtrucks.svg",
  rendevous: "src/assets/images/rendevous.svg",
  bruinbowl: "src/assets/images/bruinbowl.svg"
})

function DiningHallRatings({ locationPref, setLocationPref}) {
  return <>
    <div className={styles.diningHallsContainer}>
      {Object.keys(locations).map(loc => (
        <DiningHall
          rating={locationPref[loc]}
          onRate={(val) => setLocationPref(prev => {
            const newPref = {...prev}
            newPref[loc] = val
            return newPref
          })}
          locationImgPath={locImgPaths[loc]}
          locationName={locations[loc]}
        />
      ))}
    </div>
  </>
}

export default DiningHallRatings