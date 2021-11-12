import { useEffect, useState } from 'react'
import apiService from '../APIservice'
import './profile.css'

let initialData = {
    username: "Username",
    city: "City",
    state: "State"
}

function Profile (username) {
    
    const [userData, changeUserData] = useState(initialData)

    useEffect(() => {
        async function getUserInfo () {
            const resUserData = await apiService.getUser(username);
            changeUserData(resUserData)
        }
        getUserInfo ()
    }, [username])

    return (
        <div className="profile">
        <div className="picture-placeholder">

        </div>
        <div className="profile-info">
          <h2>{userData.username}</h2>
          <p>City: {userData.city}</p>
          <p>State: {userData.state.toUpperCase()}</p>
        </div>
      </div>
    )
}

export default Profile