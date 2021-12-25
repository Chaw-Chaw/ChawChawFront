import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertType {
  name: "Error" | "Warning" | "Success" | "Info" | string;
  message: string;
  type?: "select" | "confirm";
}

interface AlertStateType extends AlertType {
  id: number;
}

const initialState: {
  alertList: AlertStateType[];
} = {
  alertList: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    updateAlert(state, action: PayloadAction<AlertType>) {
      const newAlert = {
        name: action.payload.name,
        message: action.payload.message,
        id: state.alertList.length,
        type: action.payload.type || "confirm",
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
  extraReducers: (builder) => {
    // builder.addCase(updateAlert.fulfilled, (state, action) => {});
  },
});

export const updateAlert = createAsyncThunk(
  "alert/updateAlert",
  async (alert: AlertType, thunkAPI) => {
    thunkAPI.dispatch(alertActions.updateAlert(alert));
  }
);

export default alertSlice.reducer;
export const alertActions = alertSlice.actions;
