import { actionTypesStock } from "./ActionTypes";
const initialState = {
  productList: [],
  stockModal: [],
  stockTable: [],
  copyStockTable: [],
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
      const AlreadyExistInStock = state.stockTable.some(
        (el) => el.produto === state.product
      );
      const selectProduct = state.productList.find(
        ({ produto }) => produto === state.product
      );
      if (
        !thereIsProduct &&
        !AlreadyExistInStock &&
        selectProduct?.id &&
        parseInt(state.stock) > 0
      ) {
        return {
          ...state,
          stockModal: [
            ...state.stockModal,
            {
              ...selectProduct,
              estoque: state.stock,
              status: state.status,
            },
          ],
          product: "",
          stock: "",
        };
      }
      return state;
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
      const status = action.payload.status === "1";
      return {
        ...state,
        product: action.payload.produto,
        stock: action.payload.estoque,
        status,
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
    case actionTypesStock.fetchAllData:
      return {
        ...state,
        copyStockTable: action.payload.copyTable,
        productList: action.payload.product,
      };
    case actionTypesStock.addCopyTable:
      return { ...state, copyStockTable: action.payload };
    default:
      return state;
  }
}
