import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  value: string;
}

const initialState: UserState = {
  value: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;
