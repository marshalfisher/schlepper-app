import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EyedAlbumState {
  value: string;
}

const initialState: EyedAlbumState = {
  value: '',
};

export const eyedAlbumSlice = createSlice({
  name: 'eyedAlbum',
  initialState,
  reducers: {
    changeEyedAlbum: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeEyedAlbum } = eyedAlbumSlice.actions;
export default eyedAlbumSlice.reducer;
