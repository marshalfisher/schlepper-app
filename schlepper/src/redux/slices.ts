import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction, combineReducers, Reducer } from '@reduxjs/toolkit';
import { createStore, AnyAction } from 'redux';

// Auth reducer
const auth = createSlice({
  name: 'auth',
  initialState: {
    value: false,
  },
  reducers: {
    authTrue: state => {
      state.value = true;
    },
    authFalse: state => {
      state.value = true;
    },
  },
});
export const { authTrue, authFalse } = auth.actions;

interface UserState {
  value: string;
}

// Sets user
const user = createSlice({
  name: 'user',
  initialState: {
    value: '',
  },
  reducers: {
    changeUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { changeUser } = user.actions;

// Changes collection
const collection = createSlice({
  name: 'collection',
  initialState: {
    value: [''],
  },
  reducers: {
    changeCollection: (state, action: PayloadAction<string[]>) => {
      state.value = [...action.payload];
    },
  },
});
export const { changeCollection } = collection.actions;

// Changes wants
const wants = createSlice({
  name: 'wants',
  initialState: {
    value: [''],
  },
  reducers: {
    changeWants: (state, action: PayloadAction<string[]>) => {
      state.value = [...action.payload];
    },
  },
});
export const { changeWants } = wants.actions;

// Sets user for communication purposes
const viewedUser = createSlice({
  name: 'viewedUser',
  initialState: {
    value: '',
  },
  reducers: {
    changeViewedUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { changeViewedUser } = viewedUser.actions;

// Sets album for communication purposes
const eyedAlbum = createSlice({
  name: 'eyedAlbum',
  initialState: {
    value: '',
  },
  reducers: {
    changeEyedAlbum: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { changeEyedAlbum } = eyedAlbum.actions;

// Sets album offered in trade (for message)
const offer = createSlice({
  name: 'offer',
  initialState: {
    value: '',
  },
  reducers: {
    changeOffer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { changeOffer } = offer.actions;

// Handle LogOut
const logout = createSlice({
  name: 'logout',
  initialState: {
    value: {},
  },
  reducers: {
    logOut: () => {},
  },
});
export const { logOut } = logout.actions;

// Combine reducers
const appReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  logout: logout.reducer,
  collection: collection.reducer,
  wants: wants.reducer,
  viewedUser: viewedUser.reducer,
  eyedAlbum: eyedAlbum.reducer,
  offer: offer.reducer,
});

// Extra code here to handle log out
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'logout/logOut') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
