import axios from 'axios';
const BASE_URL = 'http://localhost:3001';


const apiService = {};

//logs user in
apiService.login = (userObject) => {
    return fetch(`${BASE_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObject),
          })
            .then((res) => res.json())
            .catch((err) => console.log(err));
}

//creates a new user
apiService.createUser = (userObject) => {
  return fetch(`${BASE_URL}/new`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(userObject),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
}

//get album info from Discogs API
apiService.getAlbumInfo = (id) => {
  const sureString = String(id);
  return fetch(`${BASE_URL}/callAPI`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id: sureString})
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

apiService.search = (query, type) => {
  const queryObject = {
    query: String(query),
    type: String(type)
  }
  return fetch(`${BASE_URL}/searchAPI`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(queryObject)
  })
  .then((res) => res.json())
  .catch((err)=> console.log(err));
}

//removes album from collection
apiService.removeCollection = (object) =>{
  //object should look like {id: * record ID*, user: *username*}
  return fetch(`${BASE_URL}/deleteCollection`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object)
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

apiService.removeWant = (object) =>{
  //object should look like {id: * record ID*, user: *username*}
  return fetch(`${BASE_URL}/deleteWant`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object)
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

apiService.addCollection = (object) => {
  return fetch(`${BASE_URL}/addCollection`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}

apiService.addWant = (object) => {
  return fetch(`${BASE_URL}/addWant`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}

apiService.findTrades = (area) => {
  return fetch(`${BASE_URL}/findTrades`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({area: area})
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

apiService.getUser = (userID) => {
  return fetch(`${BASE_URL}/getUser`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userID)
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

apiService.sendPhoto = (username, photo) => {
  const fd= new FormData();
  fd.append('image', photo, photo.name)
  fd.append('username', username)
  axios.post(`${BASE_URL}/sendPhoto`, fd)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
}

export default apiService