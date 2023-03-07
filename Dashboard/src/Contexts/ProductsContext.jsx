import { createContext, useEffect, useRef, useState } from "react"
export const productContext = createContext('')

function ProductsProvider({ children }) {
    const [update, setUpdate] = useState(false)
    const [produto, setProduto] = useState('')
    const [valor, setValor] = useState('')
    const [index, setIndex] = useState(undefined)
    const [updateOrDelete, setUpdateOrDelete] = useState(undefined)
    const [checkbox, setCheckbox] = useState(true)
    const statusRef = useRef('')
    const filterRef = useRef('')

    const btnEdit = (data) => {
        const status = data.status === "1"
        setUpdateOrDelete(data)
        setProduto(data.produto)
        setValor(data.valor)
        setCheckbox(status)
    }
    const clearFields = () => {
        setProduto('')
        setValor('')
        statusRef.current.checked = false
    }

    return (
        <productContext.Provider value={{ setUpdate, update, 
        btnEdit, updateOrDelete, setUpdateOrDelete, 
        setIndex, index, 
        produto, setProduto, 
        valor, setValor, 
        statusRef, filterRef, 
        setCheckbox, checkbox, 
        clearFields }}>
            {children}
        </productContext.Provider >
    )
}
export default ProductsProvider