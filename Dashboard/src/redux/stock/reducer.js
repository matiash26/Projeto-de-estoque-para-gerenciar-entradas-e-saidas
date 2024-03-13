import { actionTypesStock } from "./ActionTypes";
const initialState = {
  productList: [],
  stockModal: [],
  stockTable: [],
  product: "",
  stock: "",
  status: true,
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesStock.AddStock:
      return { ...state, stock: action.payload };
    case actionTypesStock.addProduct:
      return { ...state, product: action.payload };
    case actionTypesStock.addStockModal:
      const thereIsProduct = state.stockModal.some(
        (product) => product.produto === state.product
      );
      if (!thereIsProduct) {
        const selectProduct = state.productList.find(
          ({ produto }) => produto === state.product
        );
        return {
          ...state,
          product: "",
          stock: "",
          stockModal: [
            ...state.stockModal,
            {
              ...selectProduct,
              estoque: state.stock,
              status: state.status,
            },
          ],
        };
      }
    case actionTypesStock.add:
      return { ...state, product: action.payload };
    case actionTypesStock.addStatus:
      return { ...state, status: !state.status };
    case actionTypesStock.addProductList:
      return { ...state, productList: action.payload };
    case actionTypesStock.Remove:
      const removed = state.stockModal.filter(
        (product) => product.produto !== action.payload.produto
      );
      return { ...state, stockModal: removed };
    case actionTypesStock.Edit:
      const removedFromList = state.stockModal.filter(
        (item) => item.produto !== action.payload.produto
      );
      return {
        ...state,
        product: action.payload.produto,
        stock: action.payload.estoque,
        status: action.payload.status,
        stockModal: removedFromList,
      };
    case actionTypesStock.fillInFields:
      return {
        ...state,
        product: action.payload.produto,
        stock: action.payload.estoque,
        status: action.payload.status,
      };
    case actionTypesStock.Clear:
      return {
        ...state,
        productList: [],
        stockModal: [],
        product: "",
        stock: "",
      };
    case actionTypesStock.addStockTable:
      return { ...state, stockTable: action.payload };
    default:
      return state;
  }
}
