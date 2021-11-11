const BASE_URL = 'http://localhost:3001';

const apiService = {};

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

export default apiService