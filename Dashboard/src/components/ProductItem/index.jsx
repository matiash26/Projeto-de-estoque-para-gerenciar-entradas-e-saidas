import { useDispatch } from "react-redux";

//Actions
import { productRemove, productEdit } from "../../redux/product/action";

//Icons
import { FiX } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";

function ProductItem({ produto }) {
  const dispatch = useDispatch();
  const status = produto.status ? "ativo" : "desativado";

  const handleRemoveItem = () => {
    dispatch(productRemove(produto.product));
  };
  const handleEditItem = () => {
    dispatch(productEdit(produto));
  };
  return (
    <li className="modal-item">
      <div>
        <h3>Produto</h3>
        <p>{produto.product}</p>
      </div>
      <div>
        <h3>status</h3>
        <p>{status}</p>
      </div>
      <div>
        <h3>valor</h3>
        <p>{produto.value}</p>
      </div>
      <div className="btn-options">
        <button className="btn-modal edit-btn" onClick={handleEditItem}>
          <BsFillPencilFill />
        </button>
        <button className="btn-modal remove-btn" onClick={handleRemoveItem}>
          <FiX />
        </button>
      </div>
    </li>
  );
}
export default ProductItem;
