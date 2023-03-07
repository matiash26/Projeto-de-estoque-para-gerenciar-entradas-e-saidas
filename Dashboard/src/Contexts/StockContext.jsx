import { createContext, useRef, useState } from "react"
import api from "../services/Api"

export const StockContext = createContext()

function StockProvider({ children }) {
    const [updateOrDelete, setUpdateOrDelete] = useState(undefined)
    const [checkbox, setCheckbox] = useState(true)
    const [produto, setProduto] = useState('')
    const [estoque, setEstoque] = useState('')
    const [index, setIndex] = useState(null)

    const btnEdit = (data) => {
        setUpdateOrDelete(data)
        setProduto(data.produto)
        setEstoque(data.estoque)
        setCheckbox(data.status === "1")
    }

    const clearFields = () => {
        setProduto('')
        setEstoque('')
    }
    return (
        <StockContext.Provider value={{
            btnEdit, clearFields,
            produto, setProduto,
            estoque, setEstoque,
            updateOrDelete, setUpdateOrDelete,
            checkbox,setCheckbox,
            index, setIndex,
        }}>
            {children}
        </StockContext.Provider>
    )
}
export default StockProvider