import { actionTypesUser } from "./ActionTypes";
import { AlertAdd } from "../alert/actions";
import api from "../../services/Api";

export function userLogin(payload, navigate, setAlert) {
  return function (dispatch) {
    const { userName, password } = payload;
    try {
      api.post("/sign-in/", { userName, password }).then((res) => {
        dispatch({ type: actionTypesUser.addLogin, payload: res.data });
        if (res.data.permission) {
          window.localStorage.setItem("token", res.data.token);
          api.defaults.headers.authorization = `Bearer ${res.data.token}`;
          navigate("/");
          return;
        }
        setAlert(data);
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function userSignUp(userName, password) {
  return function (dispatch) {
    try {
      api.post("/sign-up", { userName, password }).then((res) => {
        dispatch(AlertAdd(res.data));
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function userDelete(id) {
  return function (dispatch) {
    try {
      api.delete("/users/delete?id=" + id).then((res) => {
        dispatch(AlertAdd(res.data));
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function userFechList() {
  return function (dispatch) {
    try {
      api.get("/users/list").then((res) => {
        dispatch({ type: actionTypesUser.addUserList, payload: res.data });
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function addUser(payload) {
  return { type: actionTypesUser.AddUser, payload };
}
export function userLogOut() {
  return { type: actionTypesUser.logOut };
}
export function userUpdate(payload, setPwd, setNewPwd) {
  return function (dispatch) {
    try {
      api
        .post(`/users/update`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        })
        .then((res) => {
          dispatch(AlertAdd(res.data.alert));
          if (res.data.alert.status === "success") {
            setPwd("");
            setNewPwd("");
            dispatch({
              type: actionTypesUser.update,
              payload: res.data.updated,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
}
export function tokenValidate(navigate, location) {
  return function (dispatch) {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        api.post("/verifyToken", { token }).then((res) => {
          const permission = res.data.permission;
          if (permission) {
            dispatch({ type: actionTypesUser.addLogin, payload: res.data });
            api.defaults.headers.authorization = `Bearer ${token}`;
            navigate(location.pathname);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
}
