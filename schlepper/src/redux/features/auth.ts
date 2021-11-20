import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  value: boolean;
}

const initialState: AuthState = {
  value: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authTrue: state => {
      state.value = true;
    },
    authFalse: state => {
      state.value = false;
    },
    isAuthenticated: state => {
      state.value;
    },
  },
});

export const { authTrue, authFalse, isAuthenticated } = authSlice.actions;
export default authSlice.reducer;
