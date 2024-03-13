import { actionTypesProducts } from "./actionTypes";

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
