import { actionTypeEntries } from "./actionTypes";
import { AlertAdd } from "../alert/actions";
import api from "./../../services/Api";

export function entriesAddProductName(payload) {
  return { type: actionTypeEntries.addProductName, payload };
}
export function entriesAddTotal() {
  return { type: actionTypeEntries.addTotal };
}
export function entriesAddQuantity(payload) {
  return { type: actionTypeEntries.addQuantity, payload };
}
export function entriesAddModalData(payload) {
  return { type: actionTypeEntries.addToModal, payload };
}
export function entriesAddTable(payload) {
  return { type: actionTypeEntries.addToTable, payload };
}
export function entriesRemoveFromModal(payload) {
  return { type: actionTypeEntries.Remove, payload };
}
export function entriesClear() {
  return { type: actionTypeEntries.Clear };
}
export function entriesFetchAll() {
  return function (dispatch) {
    try {
      Promise.all([api.get("/entries/all"), api.get("/stock/onlyStock")]).then(
        ([entries, stockRes]) => {
          dispatch({
            type: actionTypeEntries.fetchAllData,
            payload: { table: entries.data, stock: stockRes.data },
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
}
export function entriesOrder(payload) {
  return function (dispatch) {
    try {
      api.get("/entries/order/" + payload).then((res) => {
        dispatch({ type: actionTypeEntries.addToModal, payload: res.data });
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function entriesFilter(payload) {
  return function (dispatch) {
    try {
      api
        .get(`/entries/filter/${payload.startDate}/${payload.offsetDate}`)
        .then((res) => {
          dispatch({
            type: actionTypeEntries.addToCopyTable,
            payload: res.data,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
}
export function entriesOrderDelete(payload) {
  return function (dispatch) {
    try {
      api.delete("/entries/" + payload).then((res) => {
        dispatch(AlertAdd(res.data));
        dispatch({ type: actionTypeEntries.Clear });
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function entriesSubmitOrUpdate() {
  return function (dispatch) {
    try {
      const method = tableEdit?.pedido ? "put" : "post";
      api[method]("/entries/", entriesModal).then((res) => {
        dispatch(AlertAdd(res.data));
      });
    } catch (error) {
      console.error(error);
    }
  };
}
