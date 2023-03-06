import { useState, useContext } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { productContext } from "../../Contexts/ProductsContext"
import "./style.css"
function DataTableProducts({ data }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen } = useContext(GlobalContext)
    const { btnEdit } = useContext(productContext)
    const handleOptionModal = () => {
        setOptionModal(prev => !prev)
    }
    const handleEdit = async () => {
        btnModalIsOpen()
        handleOptionModal()
        btnEdit(data.id)
    }

    const handleDelete = () => {
        btnModalConfirmIsOpen()
        handleOptionModal()
        setOrderID(data.id)
    }
    const status = data.status === "1"
    return (
        <tr>
            <td>#{data.id}</td>
            <td>{data.produto}</td>
            <td><span className={status ? "active" : "disabled"}>{status ? "ativo" : "desativado"}</span></td>
            <td>R$: {data.valor}</td>
            <td className="options-container">
                <FiMoreVertical onClick={handleOptionModal} />
                <ul className={`options-btn ${optionModal && 'active-options'}`}>
                    <li onClick={handleEdit} >Editar</li>
                    <li onClick={handleDelete}>Deletar</li>
                </ul>
            </td>
        </tr>
    )
}
export default DataTableProducts