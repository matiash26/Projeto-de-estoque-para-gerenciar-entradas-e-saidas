import { actionTypesUser } from "./ActionTypes";
const initialState = {
  userList: [],
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
        user: action.payload.userData.user,
        picture: action.payload.userData.picture,
        isLogged: action.payload.permission,
      };
    case actionTypesUser.logOut:
      return { id: null, user: "", picture: "", isLogged: false };
    case actionTypesUser.update:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypesUser.addUserList:
      return { ...state, userList: action.payload };
    default:
      return state;
  }
}
export default userReducer;
