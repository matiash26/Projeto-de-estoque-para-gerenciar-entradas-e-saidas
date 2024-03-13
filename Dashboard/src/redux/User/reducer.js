import { actionTypesUser } from "./ActionTypes";
const initialState = {
  id: null,
  user: "",
  picture: "",
  isLogged: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesUser.addLogin:
      return {
        id: action.payload.userData.id,
        user: action.payload.userData.userName,
        picture: action.payload.userData.picture,
        isLogged: action.payload.permission,
      };
    case actionTypesUser.logOut:
      return { id: null, user: "", picture: "", isLogged: false };
    default:
      return state;
  }
}
export default userReducer;
