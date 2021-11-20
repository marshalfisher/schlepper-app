import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewedUserState {
  value: string;
}

const initialState: ViewedUserState = {
  value: '',
};

export const viewedUserSlice = createSlice({
  name: 'viewedUser',
  initialState,
  reducers: {
    changeViewedUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeViewedUser } = viewedUserSlice.actions;
export default viewedUserSlice.reducer;
