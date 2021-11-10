import { combineReducers } from 'redux';

//redux state
const initialState = {
  auth: false,
  user: '',
  password: '',
};

//reducer to authenticate
const auth = (state = initialState.auth, action) => {
  switch (action.type) {
  case 'AUTH_TRUE' : {
      return {
          ...state,
          auth: true,
      }}

  case 'AUTH_FALSE' : {
    return {
        ...state,
        auth: false,
    }}
  default : return state;
  }
};

const user = (state = initialState.user, action) =>{
  switch (action.type) {
    case 'CHANGE_USER':{
            return {
                ...state,
                user: action.text,
            }
        }
        default : return state;
    } 
}

const password = (state = initialState.password, action) =>{
  switch (action.type) {
    case 'CHANGE_PASS':{
            return {
                ...state,
                password: action.text,
            }
        }
        default : return state;
    } 
}

// Combining both reducers
const reducers = combineReducers({
  auth,
  user,
  password
});

export default reducers;
