import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ERROR_ALERT, ERROR_CODES } from "../../constants";
import { alertActions } from "../alertSlice";

export const asyncErrorHandle = createAsyncThunk(
  "alert/asyncErrorHandle",
  (error: Error, thunkAPI) => {
    if (axios.isAxiosError(error)) {
      const { status } = error.response?.data;
      thunkAPI.dispatch(
        alertActions.updateAlert({
          name: ERROR_ALERT,
          message: ERROR_CODES[status].message,
        })
      );
    } else {
      thunkAPI.dispatch(
        alertActions.updateAlert({ name: error.name, message: error.message })
      );
    }
  }
);
