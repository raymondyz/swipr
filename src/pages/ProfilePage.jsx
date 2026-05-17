import { useState } from "react"
import { Pages } from "../constants/pages"
import { validateLogin } from "../utils/api/authApi"
import { getUserByEmail } from "../utils/api/userApi"

function ProfilePage({ setPage, auth: {user, setUser} }){
    const [locationPref, setLocationPref] = useState(Array(11).fill(0));
    const [timePref, setTimePref] = useState("");
    const [bio, setBio] = useState("");
    const [swipeStatus, setSwipeStatus] = useState("");
    return (
        <div>
            <p>{JSON.stringify(locationPref)}</p>
            <p>{timePref}</p>
            <p>{bio}</p>
            <p>{swipeStatus}</p>
        </div>
    );
}