import { useState } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"

function StarRating({ rating, onRate }){
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
            key={star}
            onClick={() => onRate(star)}
            style={{
                cursor: "pointer",
                fontSize: "35px",
                color: star <= rating ? "gold" : "gray"
            }}
        >★</span>
      ))}
    </div>
  );
}

function ProfilePage({ setPage, auth: {user, setUser} }){
  const [locationPref, setLocationPref] = useState({
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
  });
  const [timePref, setTimePref] = useState("this is the time pref");
  const [bio, setBio] = useState("this is the bio");
  const [swipeStatus, setSwipeStatus] = useState("kore wa sutatosu desu");


    return (
        <>
        <div className="homePageContent">
            <h4>Location Preferences:</h4>
            <div className="diningHallList">
                <div className="diningHallRating">
                <img src="src/assets/images/bcafe.png" alt="BCafe" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.bcafe}
                    onRate={(val) => setLocationPref({...locationPref, bcafe: val})
                } />
                <h3>Rating: {locationPref.bcafe}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/bplate.png" alt="BPlate" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.bplate}
                    onRate={(val) => setLocationPref({...locationPref, bplate: val})
                } />
                <h3>Rating: {locationPref.bplate}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/cafe1919.png" alt="Cafe1919" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.cafe1919}
                    onRate={(val) => setLocationPref({...locationPref, cafe1919: val})
                } />
                <h3>Rating: {locationPref.cafe1919}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/deneve.png" alt="DeNeve" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.deneve}
                    onRate={(val) => setLocationPref({...locationPref, deneve: val})
                } />
                <h3>Rating: {locationPref.deneve}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/epicuria.png" alt="Epicuria" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.epicuria}
                    onRate={(val) => setLocationPref({...locationPref, epicuria: val})
                } />
                <h3>Rating: {locationPref.epicuria}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/feast.png" alt="Feast" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.feast}
                    onRate={(val) => setLocationPref({...locationPref, feast: val})
                } />
                <h3>Rating: {locationPref.feast}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/drey.svg" alt="Drey" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.thedrey}
                    onRate={(val) => setLocationPref({...locationPref, thedrey: val})
                } />
                <h3>Rating: {locationPref.thedrey}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/thestudy.png" alt="TheStudy" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.thestudy}
                    onRate={(val) => setLocationPref({...locationPref, thestudy: val})
                } />
                <h3>Rating: {locationPref.thestudy}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/foodtrucks.svg" alt="FoodTrucks" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.foodtrucks}
                    onRate={(val) => setLocationPref({...locationPref, foodtrucks: val})
                } />
                <h3>Rating: {locationPref.foodtrucks}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/rendevous.svg" alt="Rendevous" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.rendevous}
                    onRate={(val) => setLocationPref({...locationPref, rendevous: val})
                } />
                <h3>Rating: {locationPref.rendevous}/5</h3>
                </div>
                <div className="diningHallRating">
                <img src="src/assets/images/bruinbowl.svg" alt="BruinBowl" className="DiningHallPhoto"></img>
                <StarRating rating={locationPref.bruinbowl}
                    onRate={(val) => setLocationPref({...locationPref, bruinbowl: val})
                } />
                <h3>Rating: {locationPref.bruinbowl}/5</h3>
                </div>
            </div>
            <h4>Update Time Availability:</h4>
            <input
                className="credentialsBox"
                id="name"
                onChange={(e) => setTimePref(e.target.value)}
            />
            <div>
            </div>
            <h4>Update Bio:</h4>
            <input
                className="credentialsBox"
                id="name"
                onChange={(e) => setBio(e.target.value)}
            />
            <div>
            </div>
            <h4>Swipe Status:</h4>
            <input
                className="credentialsBox"
                id="name"
                onChange={(e) => setSwipeStatus(e.target.value)}
            />
            <div>
                <p>{"Location Preferences: " + JSON.stringify(locationPref)}</p>
                <p>{"Time preferences: " + timePref}</p>
                <p>{"Bio: " + bio}</p>
                <p>{"Swipe Status: " + swipeStatus}</p>
            </div>
        </div>

        </>
    );
}

export default ProfilePage