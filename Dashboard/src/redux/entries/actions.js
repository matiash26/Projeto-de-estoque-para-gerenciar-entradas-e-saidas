import { actionTypeEntries } from "./actionTypes";

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
  return { type: actionTypeEntries.AddToList, payload };
}
export function entriesAddTable(payload) {
  return { type: actionTypeEntries.addToTable, payload };
}
export function entriesAddToProductList(payload) {
  return { type: actionTypeEntries.addToProductList, payload };
}
export function entriesRemoveFromModal(payload) {
  return { type: actionTypeEntries.Remove, payload };
}
export function entriesClear() {
  return { type: actionTypeEntries.Clear };
}
