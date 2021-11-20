import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface offerState {
  value: string;
}

const initialState: offerState = {
  value: '',
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    changeOffer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeOffer } = offerSlice.actions;
export default offerSlice.reducer;
