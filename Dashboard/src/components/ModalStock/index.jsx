import { useDispatch, useSelector } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import {
  ModalTableEdit,
  modalClearAll,
  modalToggle,
} from "../../redux/modals/actions";
import {
  addStock,
  addProduct,
  addStatus,
  addStockModal,
  stockClear,
} from "../../redux/stock/action";

//Selectors
import { selectModals, selectStock } from "../../redux/selectors";

//Components
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import CheckBox from "../../components/CheckBox";
import StockItem from "../../components/StocktItem";
import InputAutoComplet from "../../components/InputAutoComplet/Index";

//Icons
import { BiBox } from "react-icons/bi";
import { FiCheck, FiX } from "react-icons/fi";

export default function ModalStock() {
  const dispatch = useDispatch();
  const { product, productList, stock, status, stockModal } =
    useSelector(selectStock);
  const { tableEdit } = useSelector(selectModals);

  const handleAddToStockModal = () => {
    dispatch(addStockModal());
  };
  const handleAddStock = (stockValue) => {
    dispatch(addStock(stockValue));
  };
  const handleAddProduct = (productName) => {
    dispatch(addProduct(productName));
  };
  const handleAddStatus = (status) => {
    dispatch(addStatus(status));
  };
  const handleCloseModal = () => {
    dispatch(stockClear());
    dispatch(modalToggle());
    if (Object.keys(tableEdit).length) {
      dispatch(modalClearAll());
    }
  };
  const handleOnSubmit = async () => {
    const updateProduct = {
      id: tableEdit.id,
      produto: product,
      status: status,
      estoque: stock,
    };
    const method = tableEdit?.id ? "put" : "post";
    const body = tableEdit?.id ? updateProduct : stockModal;
    const { data } = await api[method]("/stock/", body);
    if (data.status === "success") {
      dispatch(stockClear());
      dispatch(modalToggle());
      dispatch(ModalTableEdit({}));
    }

    dispatch(AlertAdd(data));
  };
  return (
    <Modal
      title="ADICIONAR AO ESTOQUE"
      icon={<BiBox />}
      add={handleAddToStockModal}
      exit={handleCloseModal}
      onSubmit={handleOnSubmit}
    >
      <form className="form-pop">
        <div className="form-content">
          <InputAutoComplet
            title="Nome do Produto"
            type="text"
            data={productList}
            value={product}
            setValue={handleAddProduct}
            disabled={tableEdit?.id}
          />
          <Input
            title="Quantidade"
            type="number"
            value={stock}
            onChange={({ target }) => handleAddStock(target.value)}
          />
          <CheckBox
            title="status"
            checked={status}
            onChange={({ target }) => handleAddStatus(target.checked)}
            icon01={<FiX />}
            icon02={<FiCheck />}
          />
        </div>
      </form>
      <ol className="form-items">
        {stockModal.map((item) => (
          <StockItem key={item.produto} produto={item} />
        ))}
      </ol>
      <div className="modal-total"></div>
    </Modal>
  );
}
