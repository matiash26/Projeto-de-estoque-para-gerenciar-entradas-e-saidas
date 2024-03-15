import { actionTypesUser } from "./ActionTypes";

export function userLogin(payload) {
  return { type: actionTypesUser.addLogin, payload };
}
export function addUser(payload) {
  return { type: actionTypesUser.AddUser, payload };
}
export function addPwd(payload) {
  return { type: actionTypesUser.addPwd, payload };
}
export function userLogOut() {
  return { type: actionTypesUser.logOut };
}
export function userUpdate(payload) {
  return { type: actionTypesUser.update, payload };
}
