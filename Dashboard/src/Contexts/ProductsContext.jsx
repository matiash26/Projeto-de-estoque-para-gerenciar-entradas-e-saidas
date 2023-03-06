import { createContext, useRef, useState } from "react"
import api from "../services/Api"

export const productContext = createContext('')

function ProductsProvider({ children }) {
    const [update, setUpdate] = useState(false)
    const [produto, setProduto] = useState('')
    const [valor, setValor] = useState('')
    const [index, setIndex] = useState(undefined)
    const [id, setId] = useState(undefined)
    const statusRef = useRef('')
    const filterRef = useRef('')

    const btnEdit = async (id) => {
        const { data } = await api.get("/produtos/?search=" + id)
        setProduto(data[0].produto)
        setValor(data[0].valor)
        statusRef.current.checked = data[0].status === "1"
        setUpdate(true)
    }
    const clearFields = () => {
        setProduto('')
        setValor('')
        statusRef.current.checked = false
    }
    return (
        <productContext.Provider value={{ setUpdate, update, btnEdit, id, setId, setIndex, index, produto, setProduto, valor, setValor, statusRef, filterRef, clearFields }}>
            {children}
        </productContext.Provider >
    )
}
export default ProductsProvider