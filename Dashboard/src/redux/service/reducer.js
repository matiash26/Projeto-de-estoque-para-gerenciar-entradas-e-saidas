import { actionTypeService } from "./actionTypes";
const initialState = {
  service: [],
  serviceFromDB: [],
  serviceName: "",
  spent: "",
};

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypeService.InputValue:
      const name = action.payload.name;
      const value = action.payload.value;
      return { ...state, [name]: value };
    case actionTypeService.ClearInputValue:
      return { ...state, serviceName: "", spent: "" };
    case actionTypeService.Add:
      const serviceAlready = state.service.some(
        (item) => item.serviceName === state.serviceName
      );
      const isNotEmpty = !!state.serviceName && !!state.spent;
      if (!serviceAlready && isNotEmpty) {
        return {
          ...state,
          service: [
            ...state.service,
            { serviceName: state.serviceName, spent: state.spent },
          ],
        };
      }
    case actionTypeService.Edit:
      const findService = state.service.find(
        (item) => item.serviceName === action.payload
      );
      const removeService = state.service.filter(
        (item) => item.serviceName !== action.payload
      );
      return { ...state, ...findService, service: removeService };
    case actionTypeService.ClearService:
      return { ...state, service: [] };
    case actionTypeService.Remove:
      const removed = state.service.filter(
        (item) => item.serviceName !== action.payload
      );
      return { ...state, service: removed };
    case actionTypeService.AddServiceDatabase:
      return { ...state, serviceFromDB: action.payload };
    case actionTypeService.fillInFields:
      return {
        ...state,
        serviceName: action.payload.servico,
        spent: action.payload.gasto,
      };
    default:
      return state;
  }
}
export default serviceReducer;
