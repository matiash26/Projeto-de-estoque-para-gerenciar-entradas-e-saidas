import { useDispatch } from "react-redux";

//Actions
import { editStockModal, removeStockModal } from "../../redux/stock/action";

//Icons
import { BsFillPencilFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";

import "./style.css";
function StockItem({ produto }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeStockModal(produto));
  };
  const handleEdit = () => {
    dispatch(editStockModal(produto));
  };
  const status = produto.status ? "ativo" : "desativado";
  return (
    <li className="modal-item">
      <div>
        <h3>Produto</h3>
        <p>{produto.produto}</p>
      </div>
      <div>
        <h3>Estoque</h3>
        <p>{produto.estoque}</p>
      </div>
      <div>
        <h3>status</h3>
        <p>{status}</p>
      </div>
      <div>
        <h3>valor</h3>
        <p>{produto.valor}</p>
      </div>
      <div className="btn-options">
        <button className="btn-modal edit-btn" onClick={handleEdit}>
          <BsFillPencilFill />
        </button>
        <button className="btn-modal remove-btn" onClick={handleRemove}>
          <FiX />
        </button>
      </div>
    </li>
  );
}
export default StockItem;
