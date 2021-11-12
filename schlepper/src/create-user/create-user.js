import { authTrue, changeUser, changeCollection, changeWants } from '../actions';
import apiService from '../APIservice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './create-user.css'

const initialState = {
  username: '',
  email: '',
  password: '',
};

function CreateUser () {
  
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
    const response = await apiService.createUser(userObject);
    if (response.confirmed) {
      const {accessToken} = response;
      localStorage.setItem('accessToken', accessToken);
      dispatch(changeUser(userObject.username));
      dispatch(changeWants([]));
      dispatch(changeCollection([]));
      dispatch(authTrue());
    }
  } 

  return (
      <div className="container">
          <div className="create-user">
              <h2>Create New User</h2>
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
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                  />
                  <input type="submit" value="Create Account" className="button"/>
             </form>
          </div>
      </div>
  )
}

export default CreateUser;
