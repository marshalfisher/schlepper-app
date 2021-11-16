import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'

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
}

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
}

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
}

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
}

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
}

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
}

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
}


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

const reducers = (state, action) => {
  if (action.type === 'LOG_OUT') {

    //storage.removeItem('persist:root')

    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default reducers;
