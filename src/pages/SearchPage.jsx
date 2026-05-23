import { useState, useEffect } from "react";
import { Pages } from "../constants/pages";
import { getAllUserProfiles } from "../utils/api/userApi";

function SearchPage({ setPage, auth: {user, setUser} }) {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    if (!user) setPage(Pages.LOGIN);
  }, [user]);
  
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

  return <>
    <h1>HELLO</h1>
    {profiles ?
      <ul>
        <>E</>
        {profiles.map(profile => <p>{profile.users.name}</p>)}
      </ul>
    : 
      <p>Loading...</p>
    }
  </>


  
}

export default SearchPage