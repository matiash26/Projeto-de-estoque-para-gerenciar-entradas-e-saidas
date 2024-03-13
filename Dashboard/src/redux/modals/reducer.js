import { ActionsTypeModel } from "./actionType";
const initalState = {
  modalConfirm: false,
  modal: false,
  answer: false,
  tableEdit: {},
  modalData: [],
};

function modalsReducer(state = initalState, action) {
  switch (action.type) {
    case ActionsTypeModel.ToggleModal:
      return { ...state, modal: !state.modal };
    case ActionsTypeModel.ToggleConfirmModal:
      return { ...state, modalConfirm: !state.modalConfirm };
    case ActionsTypeModel.Reply:
      return { ...state, answer: action.payload };
    case ActionsTypeModel.TableEdit:
      return { ...state, tableEdit: action.payload };
    case ActionsTypeModel.addModalData:
      return { ...state, modalData: action.payload };
    case ActionsTypeModel.Clear:
      return {
        modalConfirm: false,
        modal: false,
        answer: false,
        tableEdit: {},
        modalData: [],
      };
    default:
      return state;
  }
}
export default modalsReducer;
