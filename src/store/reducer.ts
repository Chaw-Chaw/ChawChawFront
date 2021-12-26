import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { AppState } from ".";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  chat: chatReducer,
});

export const reducer = (state: AppState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

export default rootReducer;
