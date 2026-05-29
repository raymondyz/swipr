import { useState, useEffect } from "react";
import { getAllUserProfiles } from "../utils/api/userApi";

import ProfileCard from "../components/ProfileCard";

function SearchPanel({ setPanel, auth: {user, setUser} }) {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    async function fetchProfiles() {
      const response = await getAllUserProfiles();
      if (response.data) {
        setProfiles(response.data);
      } else {
        console.error("Failed to load profiles", response.error);
      }
    }
    fetchProfiles();
  }, []);

  return (
    <>
      {profiles ?
        <ul>
          {profiles.map(profile => (
            <ProfileCard key={profile.user_id} profile={profile} />
          ))}
        </ul>
      :
        <p>Loading...</p>
      }
    </>
  )

}

export default SearchPanel