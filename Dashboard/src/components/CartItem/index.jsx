import { FiX } from "react-icons/fi"
import Button from "../../components/Button"
import "./style.css"

function CartItem(props) {
    return (
        <li className="product-content">
            <div className="productTop">
                <h4>{props.item.produto}<span id="valueProduct"> - R$: {props.item.valor}</span></h4>
                <span>R$: {props.item.total}</span>
            </div>
            <div className="productBottom">
                <div className="quantity-content">
                    <label htmlFor="quantity">Unidade / KG</label>
                    <input type="number" value={props.item.quantidade} onChange={props.onChange} name="quantity" id="quantity" />
                </div>
                {!props.updateExist && <Button title={<FiX />} onClick={props.onClick} />}
            </div>
        </li>
    )
}
export default CartItem