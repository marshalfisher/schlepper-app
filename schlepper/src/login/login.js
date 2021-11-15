import { authTrue, changeUser, changeCollection, changeWants } from '../actions';
import apiService from '../APIservice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './login.css';

const initialState = {
  username: '',
  password: '',
};

function Login () {
  
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((state) => {
      return {
      ...state,
      [name]: value,
      }
    });
  };

  async function logAttempt(userObject) {
    console.log(userObject)
    const response = await apiService.login(userObject);
    if (response.confirmed) {
      const {accessToken, collection, wants} = response;
      localStorage.setItem('accessToken', accessToken);
      dispatch(changeUser(userObject.username));
      dispatch(changeCollection(JSON.parse(collection)))
      dispatch(changeWants(JSON.parse(wants)))
      dispatch(authTrue());
    } else alert('Invalid Username or Password')
      
  } 

  return (
      <div className="container">
          <div className="login">
              <h2>Log In</h2>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  logAttempt(state);
                  setState(initialState);
                  }
              }>
                  <input
                    type="username"
                    placeholder="Username"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <input type="submit" value="Log In" className="button"/>
             </form>
          </div>
      </div>
  );
};

export default Login;
