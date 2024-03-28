import { combineReducers } from "redux";
import serviceReducer from "./service/reducer";
import modalsReducer from "./modals/reducer";
import alertReducer from "./alert/reducer";
import productReducer from "./product/reducer";
import stockReducer from "./stock/reducer";
import entriesReducer from "./entries/reducer";
import userReducer from "./User/reducer";

export const rootReducer = combineReducers({
  productReducer,
  serviceReducer,
  entriesReducer,
  modalsReducer,
  alertReducer,
  stockReducer,
  userReducer,
});
