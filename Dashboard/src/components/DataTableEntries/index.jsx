import { useState, useContext } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { EntriesContext } from "../../Contexts/EntriesContext"
import "./style.css";

function DataTableEntries({ item }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen } = useContext(GlobalContext)
    const { getOrderForEdit, setUpdate, setOrderID} = useContext(EntriesContext)
    const handleOptionModal = () => {
        setOptionModal(prev => !prev)
    }
    const handleEdit = async (order) => {
        btnModalIsOpen()
        handleOptionModal()
        setUpdate(true)
        getOrderForEdit(order.pedido)
    }

    const handleDelete = (order) => {
        btnModalConfirmIsOpen()
        handleOptionModal()
        setOrderID(order.pedido)
    }
    return (
        <>
            <tr id="tableEntries">
                <td>#{item.id}</td>
                <td>#{item.pedido}</td>
                <td>{item.data}</td>
                <td>{item.produtos}</td>
                <td>R$:{item.total}</td>
                <td className="options-container">
                    <FiMoreVertical onClick={handleOptionModal} />
                    <ul className={`options-btn ${optionModal ? 'active-options' : ''}`}>
                        <li onClick={() => handleEdit(item)} >ver / editar</li>
                        <li onClick={() => handleDelete(item)}>Deletar</li>
                    </ul>
                </td>
            </tr>
        </>
    )
}
export default DataTableEntries