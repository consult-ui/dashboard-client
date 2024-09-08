import { createSlice } from '@reduxjs/toolkit';

interface ILayout {
  theme: 'dark' | 'light';
}

const initialState: ILayout = {
  theme: 'light',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { switchTheme } = layoutSlice.actions;
export default layoutSlice.reducer;
