import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { modalClearAll, modalToggle } from "../../redux/modals/actions";
import {
  entriesAddProductName,
  entriesAddModalData,
  entriesClear,
  entriesSubmitOrUpdate,
} from "../../redux/entries/actions";

//Selectors
import { selectEntries, selectModals } from "../../redux/selectors";

//Components
import Modal from "../../components/Modal";
import CartItem from "../../components/CartItem";
import InputAutoComplet from "../../components/InputAutoComplet/Index";

//Icons
import { BsCart4 } from "react-icons/bs";

export default function ModalEntries() {
  const dispatch = useDispatch();

  const { entriesProduct, product, entriesModal } = useSelector(selectEntries);
  const { tableEdit } = useSelector(selectModals);

  const handleAddProductName = (name) => {
    dispatch(entriesAddProductName(name));
  };

  const handleAddStockToModal = () => {
    dispatch(entriesAddModalData());
  };

  const handleCloseModal = () => {
    dispatch(entriesClear());
    dispatch(modalToggle());
    if (Object.keys(tableEdit).length) {
      dispatch(modalClearAll());
    }
  };

  const handleSubmit = async () => {
    dispatch(entriesSubmitOrUpdate(tableEdit));
    handleCloseModal();
  };

  const calculateTotal = useMemo(() => {
    return entriesModal
      .reduce((acc, el) => (acc += el?.quantidade * el?.valor), 0)
      .toFixed(2);
  }, [entriesModal]);
  return (
    <Modal
      title="ADICIONAR PEDIDO"
      icon={<BsCart4 />}
      add={handleAddStockToModal}
      exit={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <div className="modal-search">
        <div>
          <h4>Produtos</h4>
          <InputAutoComplet
            data={entriesProduct}
            value={product}
            setValue={handleAddProductName}
            disabled={tableEdit?.pedido}
          />
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault(e)} className="form-historic">
        <ul className="liststockDatas">
          {entriesModal?.map((stock) => (
            <CartItem key={stock?.id} stock={stock} />
          ))}
        </ul>
        <div className="modal-total">
          <p>Total R$: {calculateTotal}</p>
        </div>
      </form>
    </Modal>
  );
}
