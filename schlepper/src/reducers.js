import { combineReducers } from 'redux';

//reducer to authenticate
const auth = (state = false, action) => {
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

//sets user
const user = (state = '', action) =>{
  switch (action.type) {
    case 'CHANGE_USER':{
        return {
          ...state,
          user: action.text,
        }
      }
      default : return state;
  } 
};

//changes token
const token = (state = '', action) =>{
  switch (action.type) {
    case 'CHANGE_TOKEN':{
        return {
          ...state,
          token: action.text,
        }
      }
      default : return state;
  } 
};

//changes collection
const collection = (state = [], action) =>{
  switch (action.type) {
    case 'CHANGE_COLLECTION':{
        return {
          ...state,
          collection: [...action.array],
        }
      }
      default : return state;
  } 
};

// changes wants 
const wants = (state = [], action) =>{
  switch (action.type) {
    case 'CHANGE_WANTS':{
        return {
          ...state,
          wants: [...action.array],
        }
      }
      default : return state;
  } 
};

//sets user for communication purposes 
const viewedUser = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_VIEWED_USER':{
        return {
          ...state,
          viewedUser: action.username,
        }
      }
      default : return state;
  } 
};

//sets album for communication purposes
const eyedAlbum = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_EYED_ALBUM' : {
      return {
        ...state,
        eyedAlbum: action.album
      }
    }
    default : return state;
  }
};

//sets album offered in trade (for message)
const offer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_OFFER' : {
      return {
        ...state,
        offer: action.album
      }
    }
    default : return state;
  }
};


// Combining both reducers
const appReducer = combineReducers({
  auth,
  user,
  token,
  collection,
  wants,
  viewedUser,
  eyedAlbum,
  offer,
});

//extra code here to handle log out 
const reducers = (state, action) => {
  if (action.type === 'LOG_OUT') {
    //storage.removeItem('persist:root')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
};

export default reducers;
