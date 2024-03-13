import { actionTypeEntries } from "./actionTypes";
const initialState = {
  entriesModal: [],
  entriesTable: [],
  entriesProduct: [],
  product: "",
  quantity: 0,
};

function entriesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypeEntries.addProductName:
      return { ...state, product: action.payload };
    case actionTypeEntries.addToProductList:
      const addQuantity = action.payload?.map((product) => ({
        ...product,
        quantidade: 1,
      }));
      return { ...state, entriesProduct: addQuantity };
    case actionTypeEntries.AddToList:
      if (typeof action.payload === "object") {
        return { ...state, entriesModal: action.payload };
      }

      const thereIs = state.entriesModal.some(
        (item) => item.produto === state.product
      );
      if (!thereIs) {
        const [findStock] = state.entriesProduct
          .filter((item) => item.produto === state.product)
          .map((el) => ({ ...el, total: el.quantidade * +el.valor }));
        return {
          ...state,
          product: "",
          entriesModal: [...state.entriesModal, findStock],
        };
      }
    case actionTypeEntries.addToTable:
      return { ...state, entriesTable: action.payload };
    case actionTypeEntries.AddValue:
      return { ...state, value: action.payload };
    case actionTypeEntries.addQuantity:
      const quantityUpdate = state.entriesModal.map((item) => {
        const id = action.payload.id;

        const quantity = +action.payload.quantityInput;
        if (item.id === id && item.quantidade > quantity && quantity > 0) {
          return {
            ...item,
            quantidade: quantity,
          };
        }
        if (item.id === id && item.estoque - quantity >= 0 && quantity > 0) {
          return {
            ...item,
            quantidade: quantity,
          };
        }

        return item;
      });
      return { ...state, entriesModal: quantityUpdate };
    case actionTypeEntries.addTotal:
      return { ...state, total: action.payload };
    case actionTypeEntries.Remove:
      const removed = state.entriesModal.filter(
        (product) => product.id !== action.payload.id
      );

      return { ...state, entriesModal: removed };
    case actionTypeEntries.Clear:
      return { ...state, entriesModal: [], product: "" };
    default:
      return state;
  }
}
export default entriesReducer;
