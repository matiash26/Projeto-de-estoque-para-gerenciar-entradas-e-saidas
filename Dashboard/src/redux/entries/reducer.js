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
      const notInModal = state.entriesModal.some(
        (item) => item.product === state.product
      );
      const productExist = state.entriesProduct.some(
        (item) => item.produto === state.product
      );
      if (!notInModal && productExist) {
        const [findStock] = state.entriesProduct
          .filter((item) => item.produto === state.product)
          .map((el) => ({
            ...el,
            total: el.quantidade * +el.valor,
            estoque: el.estoque - el.quantidade,
          }));
        return {
          ...state,
          product: "",
          entriesModal: [...state.entriesModal, findStock],
        };
      }
      return state;
    case actionTypeEntries.addToTable:
      return { ...state, entriesTable: action.payload };
    case actionTypeEntries.AddValue:
      return { ...state, value: action.payload };
    case actionTypeEntries.addQuantity:
      //se eu adicionar uma entrada nova o id será do estoque, mas se der update na tabela, vai ser a id da entrada
      const typeOfId = action.payload.idEstoque ? "idEstoque" : "id";
      const quantity = +action.payload.quantityInput;
      const id = action.payload[typeOfId];

      const quantityUpdate = state.entriesModal.map((item) => {
        const chooseID = item.idEstoque || item.id;
        if (id === chooseID && item.quantidade > quantity && quantity > 0) {
          return {
            ...item,
            quantidade: quantity,
            estoque: item.estoque + 1,
          };
        }
        if (id === chooseID && item.estoque > 0 && quantity > 0) {
          return {
            ...item,
            quantidade: quantity,
            estoque: item.estoque - 1,
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
