import { useContext, useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { StockContext } from "../../Contexts/StockContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import "./style.css"

function DataTableStock({ data }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen} = useContext(GlobalContext)
    const { btnEdit, setUniqueObject } = useContext(StockContext)
    
    const status = data.status === "1"
    const good =  data.estoque >= 50 && "good"
    const ok = data.estoque > 20 && data.estoque < 50 && "ok"
    const bad = data.estoque >= 0 && data.estoque <= 20 && "bad"
    const stockStatus = good || ok || bad
    
    const handleOptionModal = () => {
        setOptionModal(prev => !prev)
    }
    const handleEdit = () => {
        btnEdit(data.id)
        btnModalIsOpen()
        handleOptionModal()

    }
    const handleDelete = () => {
        btnModalConfirmIsOpen()
        handleOptionModal()
        setUniqueObject({id:data.id, status:data.ativo})
    }
    return (
        <tr>
            <td>#{data.id}</td>
            <td>{data.produto}</td>
            <td>{data.data}</td>
            <td><span className={status ? "status": "disabled"}>{status? "ativo":"desativado"}</span></td>
            <td> <span className={stockStatus}>{data.estoque}</span></td>
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
export default DataTableStock