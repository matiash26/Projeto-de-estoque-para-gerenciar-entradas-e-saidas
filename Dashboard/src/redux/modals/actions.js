import { ActionsTypeModel } from "./actionType";

export function modalConfirmToggle() {
  return { type: ActionsTypeModel.ToggleConfirmModal };
}
export function modalToggle() {
  return { type: ActionsTypeModel.ToggleModal };
}
export function ReplyModalConfirm(payload) {
  return { type: ActionsTypeModel.Reply, payload };
}
export function ModalTableEdit(payload) {
  return { type: ActionsTypeModel.TableEdit, payload };
}
export function modalAddData(payload) {
  return { type: ActionsTypeModel.addModalData, payload };
}
export function modalClearAll() {
  return { type: ActionsTypeModel.Clear };
}
