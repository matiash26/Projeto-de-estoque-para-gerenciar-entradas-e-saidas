import { BsFillPencilFill } from "react-icons/bs"
import { FiX } from "react-icons/fi"
import "./style.css"
function ProductItem({ produto, editModal, removeModal}) {
    const status = produto.status === true? "ativo" : "desativado"
    return (
        <li className="product-item">
            <div>
                <h3>Produto</h3>
                <p>{produto.produto}</p>
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
                <button className="btn-product edit-btn" onClick={editModal}><BsFillPencilFill /></button>
                <button className="btn-product remove-btn" onClick={removeModal}><FiX /></button>
            </div>
        </li>
    )
}
export default ProductItem