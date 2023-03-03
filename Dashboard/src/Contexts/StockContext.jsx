import { createContext, useRef, useState } from "react"
import api from "../services/Api"

export const StockContext = createContext()

function StockProvider({ children }) {
    const [uniqueObject, setUniqueObject] = useState(null)
    const [produto, setProduto] = useState('')
    const [estoque, setEstoque] = useState('')
    const [index, setIndex] = useState(null)
    const statusRef = useRef('')

    const btnEdit = async (id) => {
        const { data } = await api.get("/estoque/?search=" + id)
        setUniqueObject(...data)
        setProduto(data[0].produto)
        setEstoque(data[0].estoque)
        statusRef.current.checked = data[0].status === "1"
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
            index, setIndex,
            uniqueObject, setUniqueObject,
            statusRef
        }}>
            {children}
        </StockContext.Provider>
    )
}
export default StockProvider