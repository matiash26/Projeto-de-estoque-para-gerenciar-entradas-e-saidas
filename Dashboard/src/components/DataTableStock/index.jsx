import { useContext, useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { GlobalContext } from "../../Contexts/GlobalContext"
import { StockContext } from "../../Contexts/StockContext"
import "./style.css"

function DataTableStock({ data }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen} = useContext(GlobalContext)
    const { btnEdit, setUpdateOrDelete } = useContext(StockContext)

    const status = data.status === "1" ? true : false

    const handleOptionModal = () => {
        setOptionModal(prev => !prev)
    }
    const handleEdit = () => {
        btnEdit(data)
        btnModalIsOpen()
        handleOptionModal()

    }
    const handleDelete = () => {
        btnModalConfirmIsOpen()
        handleOptionModal()
        setUpdateOrDelete({id:data.id, status:data.ativo})
    }
    return (
        <tr>
            <td>#{data.id}</td>
            <td>{data.produto}</td>
            <td>{data.data}</td>
            <td><span className={status ? "active" : "disabled"}>{status ? "ativo" : "desativado"}</span></td>
            <td>{data.estoque}</td>
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
export default DataTableStock