import { actionTypesStock } from "./ActionTypes";

export function addStock(payload) {
  return { type: actionTypesStock.AddStock, payload };
}
export function addProduct(payload) {
  return { type: actionTypesStock.addProduct, payload };
}
export function productListAdd(payload) {
  return { type: actionTypesStock.addProductList, payload };
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
