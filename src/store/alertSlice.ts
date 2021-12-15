import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  alertList: {
    name: string;
    message: string;
    id: number;
    confirmFunc?: (() => void) | null;
  }[];
} = {
  alertList: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    updateAlert(
      state,
      action: PayloadAction<{
        name: string;
        message: string;
        confirmFunc?: () => void;
      }>
    ) {
      const newAlert = {
        name: action.payload.name,
        message: action.payload.message,
        id: state.alertList.length,
        confirmFunc: action.payload.confirmFunc,
      };
      state.alertList.push(newAlert);
    },
    initAlertList(state) {
      state.alertList = [];
    },
    removeAlert(state, action) {
      state.alertList = state.alertList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export default alertSlice.reducer;
export const alertActions = alertSlice.actions;
