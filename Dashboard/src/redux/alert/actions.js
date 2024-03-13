import { ActionTypeAlert } from "../alert/ActionType";

export function AlertAdd(payload) {
  return { type: ActionTypeAlert.Add, payload };
}

export function AlertClear() {
  return { type: ActionTypeAlert.Clear };
}
