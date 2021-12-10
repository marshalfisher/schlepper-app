import { combineReducers, Reducer, AnyAction } from 'redux';

// //reducer to authenticate
const auth = (state: boolean = false, action: AnyAction) => {
  switch (action.type) {
    case 'AUTH_TRUE': {
      return {
        auth: true,
      };
    }
    case 'AUTH_FALSE': {
      return {
        auth: false,
      };
    }
    default:
      return state;
  }
};

//sets user

const user = (state: string = '', action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_USER': {
      return action.text;
    }
    default:
      return state;
  }
};

// //changes token
const token = (state: string = '', action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_TOKEN': {
      return {
        token: action.text,
      };
    }
    default:
      return state;
  }
};

//changes collection
const collection = (state: object[] = [], action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_COLLECTION': {
      return {
        collection: [...action.array],
      };
    }
    default:
      return state;
  }
};

// // changes wants
const wants = (state: object[] = [], action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_WANTS': {
      return {
        wants: [...action.array],
      };
    }
    default:
      return state;
  }
};

//sets user for communication purposes
const viewedUser = (state: string = '', action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_VIEWED_USER': {
      return action.username;
    }
    default:
      return state;
  }
};

//sets album for communication purposes
const eyedAlbum = (state: string = '', action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_EYED_ALBUM': {
      return { eyedAlbum: action.album };
    }
    default:
      return state;
  }
};

//sets album offered in trade (for message)
const offer = (state: string = '', action: AnyAction) => {
  switch (action.type) {
    case 'CHANGE_OFFER': {
      return { offer: action.album };
    }
    default:
      return state;
  }
};

// Combining both reducers
const appReducer: Reducer = combineReducers({
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
const reducers: Reducer = (state, action: AnyAction) => {
  if (action.type === 'LOG_OUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default reducers;
export type RootState = ReturnType<typeof appReducer>;
