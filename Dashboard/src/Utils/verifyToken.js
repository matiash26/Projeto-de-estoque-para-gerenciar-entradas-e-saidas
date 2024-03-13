import api from "../services/Api";
import { userLogin } from "./../redux/User/Actions";

export async function verifyToken(dispatch) {
  const token = window.localStorage.getItem("token");
  if (token) {
    const { data } = await api.post("/verifyToken", { token });
    const permission = data.permission;
    if (permission) {
      dispatch(userLogin(data));
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
    return permission;
  }
}
