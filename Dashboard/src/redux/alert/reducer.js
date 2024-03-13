import { ActionTypeAlert } from "./ActionType";
const initalState = {
  status: "",
  message: "",
};

function alertReducer(state = initalState, action) {
  switch (action.type) {
    case ActionTypeAlert.Add:
      return { ...state, ...action.payload };
    case ActionTypeAlert.Clear:
      return { ...state, error: false, message: "" };
    default:
      return state;
  }
}
export default alertReducer;
