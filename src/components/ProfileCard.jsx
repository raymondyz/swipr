function ProfileCard({profile}) {
  const username = profile.users?.username
  const name = profile.users?.name
  const swipe_availability = profile.swipe_availability
  const location_preferences = profile.location_preferences
  const notes = profile.notes
  

  return <div style={{border: "1px solid black"}}>
    <h2>{name}</h2>
    <p>{username}</p>
    <h3>Swipe: {swipe_availability}</h3>
    
    {location_preferences && Object.keys(location_preferences).map(location => <p>{location}</p>)}
  </div>
}

export default ProfileCard