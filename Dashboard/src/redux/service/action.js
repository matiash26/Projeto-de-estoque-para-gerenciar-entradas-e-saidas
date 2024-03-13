import { actionTypeService } from "./actionType";

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
