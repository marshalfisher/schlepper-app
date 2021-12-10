import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

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
    .then(res => res.json())
    .catch((err) => console.log(err));
};

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
      .then(res => res.json())
      .catch((err) => console.log(err));
};

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
  .then(res => res.json())
  .catch((err) => console.log(err));
};

//searches the api
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
  .then(res => res.json())
  .catch((err)=> console.log(err));
};

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
  .then(res => res.json())
  .catch((err) => console.log(err));
};

//removes item from want list
apiService.removeWant = (object) =>{
  //object should look like {id: * record ID*, user: *username*}
  return fetch(`${BASE_URL}/deleteWant`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object)
  })
  .then(res => res.json())
  .catch((err) => console.log(err));
};

//add 1 item to user's collection
apiService.addCollection = (object) => {
  return fetch(`${BASE_URL}/addCollection`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  .then(res => res.json())
  .catch((err) => console.log(err))
};

//adds 1 item to user's want list
apiService.addWant = (object) => {
  return fetch(`${BASE_URL}/addWant`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  .then(res => res.json())
  .catch((err) => console.log(err))
};

//finds users with trades in an area
apiService.findTrades = (area) => {
  return fetch(`${BASE_URL}/findTrades`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({area: area})
  })
  .then(res => res.json())
  .catch((err) => console.log(err));
};

//gets user info to display profile
apiService.getUser = (userID) => {
  return fetch(`${BASE_URL}/getUser`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userID)
  })
  .then(res => res.json())
  .catch((err) => console.log(err));
};

//sends image to server
apiService.sendImage = (image) => {
  const fd= new FormData();
  fd.append('image', image)
  axios.post(`${BASE_URL}/sendImage`, fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
  .catch((err) => console.log(err))
};

//updates user details
apiService.updateUser = (username, value, newValue) => {
  const updateObject = {username, value, newValue}
  return fetch(`${BASE_URL}/updateUser`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateObject)
  })
  // .then(res => res.json())
  .catch(e => console.log(e));
};

//sends a message
apiService.sendMessage = (messageObject) => {
  return fetch(`${BASE_URL}/sendMessage`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageObject)
  })
  .catch(e => console.log(e));
};

//gets messages
apiService.getMessages = (user) => {
  return fetch(`${BASE_URL}/getMessages`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
  })
  .then(res => res.json())
  .catch(e => console.log(e));
};

//deletes messages 
apiService.deleteMessage = (id) => {
  return fetch(`${BASE_URL}/deleteMessage` ,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(res => res.json())
  .catch(e => console.log(e))
};

//gets users's trades
apiService.getTrades = (user) => {
  //user
  return fetch(`${BASE_URL}/getTrades` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
  })
  .then(res => res.json())
  .catch(err => console.log(err))
};

//adds trade to database
apiService.makeTrade = (object) => {
  //user1, user2, offer1, offer2, location, additional
  return fetch(`${BASE_URL}/makeTrade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
};

//deletes trade from database 
apiService.deleteTrade = (id) => {
  //id
  return fetch(`${BASE_URL}/deleteTrade`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(res => res.json())
  .catch(err => console.log(err))
};

export default apiService;