import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILayout {
  theme: 'dark' | 'light';
  isShowOrgModal: boolean;
}

const initialState: ILayout = {
  theme: 'light',
  isShowOrgModal: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setShowOrgModal: (state, action: PayloadAction<boolean>) => {
      state.isShowOrgModal = action.payload;
    },
  },
});

export const { switchTheme, setShowOrgModal } = layoutSlice.actions;
export default layoutSlice.reducer;
