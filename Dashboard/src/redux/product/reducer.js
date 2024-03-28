import { actionTypesProducts } from "./actionTypes";
const initialState = {
  productList: [],
  productTable: [],
  copyTable: [],
  productName: "",
  value: "",
  status: true,
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypesProducts.AddProductName:
      return { ...state, productName: action.payload };
    case actionTypesProducts.AddValue:
      return { ...state, value: action.payload };
    case actionTypesProducts.AddToList:
      const product = state.productName;
      const status = state.status;
      const value = state.value;
      const isNotEmpty = product?.length && value?.length;
      const AlreadyExist = state.productTable.some(
        (item) => item?.produto.toLowerCase() === product.toLowerCase()
      );
      if (isNotEmpty && !AlreadyExist) {
        return {
          ...state,
          productList: [...state.productList, { product, status, value }],
          value: "",
          productName: "",
          status: false,
        };
      }
      return state;
    case actionTypesProducts.Edit:
      const removeFromList = state.productList.filter(
        ({ product }) => product !== action.payload.product
      );
      return {
        ...state,
        productName: action.payload.product,
        value: action.payload.value,
        status: action.payload.status,
        productList: removeFromList,
      };
    case actionTypesProducts.statusToggle:
      return { ...state, status: !state.status };
    case actionTypesProducts.Remove:
      const productList = state.productList.filter(
        ({ produto }) => produto !== action.payload.product
      );
      return { ...state, productList };
    case actionTypesProducts.fillInFields:
      const statusValue = action.payload.status === "1";
      return {
        ...state,
        productName: action.payload.produto,
        value: action.payload.valor,
        status: statusValue,
      };
    case actionTypesProducts.Clear:
      return {
        ...state,
        productList: [],
        productName: "",
        value: "",
        status: true,
      };
    case actionTypesProducts.addToTable:
      return {
        ...state,
        productTable: action.payload,
      };
    case actionTypesProducts.addToCopyTable:
      return { ...state, copyTable: action.payload };
    default:
      return state;
  }
}
export default productReducer;
