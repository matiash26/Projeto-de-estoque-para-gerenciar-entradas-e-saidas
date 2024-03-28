import { useSelector, useDispatch } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import { modalClearAll, modalToggle } from "../../redux/modals/actions";
import {
  productNameAdd,
  productValueAdd,
  productStatusToggle,
  productListAdd,
  productClear,
  productUpdateOrSubmit,
} from "../../redux/product/action";

//Selectors
import { selectModals, selectProducts } from "../../redux/selectors";

//Components
import ProductItem from "../ProductItem";
import CheckBox from "../CheckBox";
import Modal from "../Modal";
import Input from "../Input";

//Icons
import { FiCheck, FiX, FiBox } from "react-icons/fi";

function ModalProducts() {
  const dispatch = useDispatch();

  const { productName, productList, value, status } =
    useSelector(selectProducts);
  const { tableEdit } = useSelector(selectModals);

  const handleAddName = (name) => {
    dispatch(productNameAdd(name));
  };
  const handleAddValue = (value) => {
    dispatch(productValueAdd(value));
  };
  const handleProductListAdd = () => {
    dispatch(productListAdd());
  };
  const handleStatus = () => {
    dispatch(productStatusToggle());
  };
  const handleCloseModal = () => {
    dispatch(productClear());
    dispatch(modalToggle());
    if (Object.keys(tableEdit).length) {
      dispatch(modalClearAll());
    }
  };
  const handleSubmit = () => {
    dispatch(
      productUpdateOrSubmit(tableEdit, productName, status, value, productList)
    );
    dispatch(modalToggle());
    dispatch(modalClearAll());
  };
  return (
    <Modal
      title="ADICIONAR PRODUTO"
      icon={<FiBox />}
      add={handleProductListAdd}
      exit={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <form className="form-pop">
        <div className="form-content">
          <Input
            title="Produto"
            type="text"
            value={productName}
            onChange={({ target }) => handleAddName(target.value)}
          />
          <Input
            title="valor"
            type="number"
            value={value}
            onChange={({ target }) => handleAddValue(target.value)}
          />
          <CheckBox
            title="status"
            checked={status}
            onChange={handleStatus}
            icon01={<FiX />}
            icon02={<FiCheck />}
          />
        </div>
      </form>
      <ol className="form-items">
        {productList?.map((item) => (
          <ProductItem key={item.product} produto={item} />
        ))}
      </ol>
      <div className="modal-total"></div>
    </Modal>
  );
}
export default ModalProducts;
