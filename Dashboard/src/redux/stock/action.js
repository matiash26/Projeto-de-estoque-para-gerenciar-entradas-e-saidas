import { actionTypesStock } from "./ActionTypes";
import { AlertAdd } from "../alert/actions";
import api from "../../services/Api";

export function addStock(payload) {
  return { type: actionTypesStock.AddStock, payload };
}
export function addProduct(payload) {
  return { type: actionTypesStock.addProduct, payload };
}
export function addStatus() {
  return { type: actionTypesStock.addStatus };
}
export function addStockModal() {
  return { type: actionTypesStock.addStockModal };
}
export function editStockModal(payload) {
  return { type: actionTypesStock.Edit, payload };
}
export function removeStockModal(payload) {
  return { type: actionTypesStock.Remove, payload };
}
export function stockClear() {
  return { type: actionTypesStock.Clear };
}
export function addStockTable(payload) {
  return { type: actionTypesStock.addStockTable, payload };
}
export function stockFillIFields(payload) {
  return { type: actionTypesStock.fillInFields, payload };
}
export function stockFetchAllData() {
  return function (dispatch) {
    try {
      Promise.all([api.get("/product/filtered"), api.get("/stock/all")]).then(
        ([product, stock]) => {
          dispatch({
            type: actionTypesStock.fetchAllData,
            payload: { product: product.data, copyTable: stock.data },
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
}
export function stockFilter(filter, active) {
  return function (dispatch) {
    try {
      if (filter || active) {
        api.get(`/stock/?search=${filter}&active=${active}`).then((res) => {
          dispatch({ type: actionTypesStock.addCopyTable, payload: res.data });
        });
        return;
      }
      dispatch(stockFetchAllData());
    } catch (error) {
      console.error(error)
    }
  };
}
export function stockDelete(id, status) {
  return function (dispatch) {
    try {
      api.delete(`/stock/${id}?active=${status}`).then((res) => {
        dispatch(AlertAdd(data));
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function stockSubmitOrUpdate(
  tableEdit,
  product,
  status,
  stock,
  stockModal
) {
  return function (dispatch) {
    try {
      const updateProduct = {
        id: tableEdit.id,
        produto: product,
        status: status,
        estoque: stock,
      };
      const method = tableEdit?.id ? "put" : "post";
      const body = tableEdit?.id ? updateProduct : stockModal;
      api[method]("/stock/", body).then((res) => {
        dispatch(AlertAdd(res.data));
        dispatch(stockClear());
      });
    } catch (error) {
      console.error(error);
    }
  };
}
