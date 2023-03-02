import { useContext, useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { StockContext } from "../../Contexts/StockContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import "./style.css"

function DataTableProduct({ data }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen} = useContext(GlobalContext)
    const { btnEdit, setUniqueObject } = useContext(StockContext)
    
    const active = data.status === "1"
    const good =  data.quantidade >= 50 && "good"
    const ok = data.quantidade > 20 && data.quantidade < 50 && "ok"
    const bad = data.quantidade >= 0 && data.quantidade <= 20 && "bad"
    const stockStatus = good || ok || bad
    
    const handleOptionModal = () => {
        setOptionModal(prev => !prev)
    }
    const handleEdit = (data) => {
        btnEdit(data.id)
        btnModalIsOpen()
        handleOptionModal()

    }
    const handleDelete = (data) => {
        btnModalConfirmIsOpen()
        handleOptionModal()
        setUniqueObject({id:data.id, active:data.ativo})
    }
    return (
        <tr>
            <td>#{data.id}</td>
            <td>{data.produto}</td>
            <td>{data.data}</td>
            <td><span className={active ? "active": "disabled"}>{active? "ativo":"desativado"}</span></td>
            <td> <span className={stockStatus}>{data.quantidade}</span></td>
            <td>R$: {data.valor}</td>
            <td className="options-container">
                <FiMoreVertical onClick={handleOptionModal} />
                <ul className={`options-btn ${optionModal ? 'active-options' : null}`}>
                    <li onClick={() =>handleEdit(data)} >Editar</li>
                    <li onClick={() =>handleDelete(data)}>Deletar</li>
                </ul>
            </td>
        </tr>
    )
}
export default DataTableProduct