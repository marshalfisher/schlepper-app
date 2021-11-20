import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollectionState {
  value: object[];
}

const initialState: CollectionState = {
  value: [],
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    changeCollection: (state, action: PayloadAction<object[]>) => {
      state.value = action.payload;
    },
  },
});

export const { changeCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
