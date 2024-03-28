import { actionTypeService } from "./actionTypes";
import { AlertAdd } from "../alert/actions";
import api from "../../services/Api";

export function serviceAdd() {
  return { type: actionTypeService.Add };
}
export function serviceEdit(payload) {
  return { type: actionTypeService.Edit, payload };
}
export function serviceRemove(payload) {
  return { type: actionTypeService.Remove, payload };
}
export function serviceClear() {
  return { type: actionTypeService.ClearService };
}
export function serviceInputValue(payload) {
  return { type: actionTypeService.InputValue, payload };
}
export function serviceClearnInputValue() {
  return { type: actionTypeService.ClearInputValue };
}
export function serviceDatabase(payload) {
  return { type: actionTypeService.AddServiceDatabase, payload };
}
export function serviceModalToggle() {
  return { type: actionTypeService.Modal };
}
export function fillInFields(payload) {
  return { type: actionTypeService.fillInFields, payload };
}
export function serviceFetchData() {
  return function (dispatch) {
    try {
      api.get("/services/all").then((res) => {
        dispatch({ type: actionTypeService.addCopyService, payload: res.data });
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function serviceFilter(start, offset) {
  return function (dispatch) {
    try {
      if (start && offset) {
        api.get(`/services/filter/${startDate}/${offset}`).then((res) => {
          dispatch({
            type: actionTypeService.addCopyService,
            payload: res.data,
          });
        });
        return;
      }
      if (!serviceFromDB.length) {
        dispatch(serviceFetchData());
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function serviceDelete(id) {
  return function (dispatch) {
    try {
      api.delete(`/services/${id}`).then((res) => {
        dispatch(AlertAdd(res.data));
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function serviceUpdateOrSubmit(tableEdit, serviceName, spent) {
  return function (dispatch) {
    const method = tableEdit.id ? "put" : "post";
    const body = tableEdit?.id
      ? {
          id: tableEdit.id,
          servico: serviceName,
          gasto: spent,
        }
      : service;
    api[method]("/services/", body).then((res) => {
      dispatch(AlertAdd(res.data));
    });
  };
}
