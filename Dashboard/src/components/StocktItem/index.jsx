import { BsFillPencilFill } from "react-icons/bs"
import { FiX } from "react-icons/fi"
import "./style.css"
function StockItem({ produto, editCart, removeCart}) {
    return (
        <li className="product-item">
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
                <p>{produto.status}</p>
            </div>
            <div>
                <h3>valor</h3>
                <p>{produto.valor}</p>
            </div>
            <div className="btn-options">
                <button className="btn-product edit-btn" onClick={editCart}><BsFillPencilFill /></button>
                <button className="btn-product remove-btn" onClick={removeCart}><FiX /></button>
            </div>
        </li>
    )
}
export default StockItem