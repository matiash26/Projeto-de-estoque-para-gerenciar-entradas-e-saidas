import { actionTypesProducts } from "./actionTypes";
import { AlertAdd } from "../alert/actions";
import api from "../../services/Api";

export function productNameAdd(payload) {
  return { type: actionTypesProducts.AddProductName, payload };
}
export function productValueAdd(payload) {
  return { type: actionTypesProducts.AddValue, payload };
}
export function productRemove(payload) {
  return { type: actionTypesProducts.Remove, payload };
}
export function productListAdd() {
  return { type: actionTypesProducts.AddToList };
}
export function productTabletAdd(payload) {
  return { type: actionTypesProducts.addToTable, payload };
}
export function productEdit(payload) {
  return { type: actionTypesProducts.Edit, payload };
}
export function productClear() {
  return { type: actionTypesProducts.Clear };
}
export function productStatusToggle() {
  return { type: actionTypesProducts.statusToggle };
}

export function productfillInFields(payload) {
  return { type: actionTypesProducts.fillInFields, payload };
}
export function productFetchAllData() {
  return function (dispatch) {
    try {
      api.get("/product/all").then((res) =>
        dispatch({
          type: actionTypesProducts.addToCopyTable,
          payload: res.data,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
}
export function productFilter(filter, status) {
  return function (dispatch) {
    if (filter || status) {
      api.get(`/product/?search=${filter}&status=${status}`).then((res) => {
        dispatch({
          type: actionTypesProducts.addToCopyTable,
          payload: res.data,
        });
      });
      return;
    }
    api.get("/product/all").then((res) => {
      dispatch({
        type: actionTypesProducts.addToCopyTable,
        payload: res.data,
      });
    });
  };
}
export function productDelete(id, active) {
  return function (dispatch) {
    try {
      api.delete(`/product/${id}?status=${active}`).then((res) => {
        dispatch(AlertAdd(res.data));
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function productUpdateOrSubmit(
  tableEdit,
  productName,
  status,
  value,
  productList
) {
  return function (dispatch) {
    const method = tableEdit?.id ? "put" : "post";
    const isUpdate = tableEdit?.id
      ? {
          id: tableEdit.id,
          produto: productName,
          status: status,
          valor: value,
        }
      : productList;
    api[method]("/product/", isUpdate).then((res) => {
      dispatch(AlertAdd(res.data));
    });
  };
}
