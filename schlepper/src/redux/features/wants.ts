import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WantsState {
  value: object[];
}

const initialState: WantsState = {
  value: [],
};

export const wantsSlice = createSlice({
  name: 'wants',
  initialState,
  reducers: {
    changeWants: (state, action: PayloadAction<object[]>) => {
      state.value = [...state.value, ...action.payload];
    },
  },
});

export const { changeWants } = wantsSlice.actions;
export default wantsSlice.reducer;
