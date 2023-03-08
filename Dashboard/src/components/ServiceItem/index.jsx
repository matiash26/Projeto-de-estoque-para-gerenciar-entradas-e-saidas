import { BsFillPencilFill } from "react-icons/bs"
import { FiX } from "react-icons/fi"
import "./style.css"
function ServiceItem({ service, editModal, removeModal }) {
    return (
        <li className="modal-item">
            <div>
                <h3>Serviço</h3>
                <p>{service.service}</p>
            </div>
            <div>
                <h3>Gasto</h3>
                <p>R$: {service.gasto}</p>
            </div>
            <div className="btn-options">
                <button className="btn-modal edit-btn" onClick={editModal}><BsFillPencilFill /></button>
                <button className="btn-modal remove-btn" onClick={removeModal}><FiX /></button>
            </div>
        </li>
    )
}
export default ServiceItem