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

function TimeTable({ availability, updateAvailability }) {
    const timeList = ["6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm",
        "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm",
         "9:00pm", "10:00pm", "11:00pm"
     ];
     const dotw = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div className="TimeGrid">
            {availability.map((row, rowIndex) => (
                <div className="TimeRow" key={rowIndex}>
                    {row.map((available, colIndex) => (
                        <div
                        
                            key={colIndex}
                            onClick={() => updateAvailability(rowIndex, colIndex)}
                            style={{
                                width: "40px",
                                height: "30px",
                                cursor: "pointer",
                                fontSize: "50px",
                                border: "1px solid black",
                                backgroundColor: available ? "#adeeb0" : "#efa49e"
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function ProfilePage({ setPage, auth: {user, setUser} }){

    function updateAvailability(row, col) {
        setTimePref(prev =>
            prev.map((r, rIndex) =>
                rIndex === row
                    ? r.map((val, valIndex) =>
                        valIndex === col ? !val : val
                    ) : r
            )
        );
    }

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
  const [timePref, setTimePref] = useState([
    //Su    Mo    Tu    We    Th    Fr    Sa
    [false,false,false,false,false,false,false], //6am - 6:59am
    [false,false,false,false,false,false,false], //7am
    [false,false,false,false,false,false,false], //8am
    [false,false,false,false,false,false,false], //9am
    [false,false,false,false,false,false,false], //10am
    [false,false,false,false,false,false,false], //11am
    [false,false,false,false,false,false,false], //12pm
    [false,false,false,false,false,false,false], //1pm
    [false,false,false,false,false,false,false], //2pm
    [false,false,false,false,false,false,false], //3pm
    [false,false,false,false,false,false,false], //4pm
    [false,false,false,false,false,false,false], //5pm
    [false,false,false,false,false,false,false], //6pm
    [false,false,false,false,false,false,false], //7pm
    [false,false,false,false,false,false,false], //8pm
    [false,false,false,false,false,false,false], //9pm
    [false,false,false,false,false,false,false], //10pm
    [false,false,false,false,false,false,false], //11pm - 11:59am
    ]);
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
            <TimeTable
                availability={timePref}
                updateAvailability={updateAvailability}
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
                <p>{"Time preferences: " + JSON.stringify(timePref)}</p>
                <p>{"Bio: " + bio}</p>
                <p>{"Swipe Status: " + swipeStatus}</p>
            </div>
        </div>

        </>
    );
}

export default ProfilePage