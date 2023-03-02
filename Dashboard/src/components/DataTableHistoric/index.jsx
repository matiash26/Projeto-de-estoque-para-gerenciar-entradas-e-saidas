import { useState, useContext } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { HistoricContext } from "../../Contexts/HistoricContext"
import "./style.css";

function DataTableHistoric({ item }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen } = useContext(GlobalContext)
    const { getOrderForEdit, setUpdate, setOrderID} = useContext(HistoricContext)
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
            <tr id="tableHistoric">
                <td>#{item.id}</td>
                <td>{item.pedido}</td>
                <td>{item.status}</td>
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
export default DataTableHistoric