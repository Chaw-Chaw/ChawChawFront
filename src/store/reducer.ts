import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import { AppState } from ".";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import chartReducer from "./chartSlice";
import profileReducer from "./profileSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  chat: chatReducer,
  chart: chartReducer,
  profile: profileReducer,
});

export const reducer = (state: AppState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

export default rootReducer;
