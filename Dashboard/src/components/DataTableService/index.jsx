import { useContext, useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { ServiceContext } from "../../Contexts/ServiceContext"
import { GlobalContext } from "../../Contexts/GlobalContext"
import "./style.css"

function DataTableStock({ data }) {
    const [optionModal, setOptionModal] = useState(false)
    const { btnModalIsOpen, btnModalConfirmIsOpen} = useContext(GlobalContext)
    const { btnEdit, setUpdateOrDelete } = useContext(ServiceContext)
    
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
            <td>{data.servico}</td>
            <td>{data.data}</td>
            <td>R$: {data.gasto}</td>
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