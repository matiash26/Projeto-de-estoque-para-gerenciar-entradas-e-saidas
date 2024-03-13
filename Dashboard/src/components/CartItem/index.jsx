import { useSelector, useDispatch } from "react-redux";

//Actions
import {
  entriesRemoveFromModal,
  entriesAddQuantity,
} from "../../redux/entries/actions";

//selectors
import { selectModals } from "../../redux/selectors";

//icons
import { FiX } from "react-icons/fi";

//components
import Button from "../../components/Button";

import "./style.css";

function CartItem({ stock }) {
  const { tableEdit } = useSelector(selectModals);
  const dispatch = useDispatch();
  const total = stock.valor * stock.quantidade;

  const handleRemove = () => {
    dispatch(entriesRemoveFromModal(stock));
  };
  const handleQuantity = (quantityInput) => {
    dispatch(
      entriesAddQuantity({
        quantityInput,
        ...stock,
      })
    );
  };
  return (
    <li className="cartItem">
      <div className="productTop">
        <h4>
          {stock.produto}
          <span id="valueProduct"> - R$: {stock.valor}</span>
        </h4>
        <span>R$: {total}</span>
      </div>
      <div className="productBottom">
        <div className="quantity-content">
          <label htmlFor="quantity">Unidade / KG</label>
          <input
            type="number"
            value={stock.quantidade}
            onChange={({ target }) => handleQuantity(target.value)}
            name="quantity"
            id="quantity"
          />
        </div>
        {!tableEdit?.id && <Button title={<FiX />} onClick={handleRemove} />}
      </div>
    </li>
  );
}
export default CartItem;
