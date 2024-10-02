import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILayout {
  theme: 'dark' | 'light';
  isShowOrgModal: boolean;
  isPrintMessage: boolean;
}

const initialState: ILayout = {
  theme: 'light',
  isShowOrgModal: false,
  isPrintMessage: false,
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
    setPrintMessage: (state, action: PayloadAction<boolean>) => {
      state.isPrintMessage = action.payload;
    },
  },
});

export const { switchTheme, setShowOrgModal, setPrintMessage } = layoutSlice.actions;
export default layoutSlice.reducer;
