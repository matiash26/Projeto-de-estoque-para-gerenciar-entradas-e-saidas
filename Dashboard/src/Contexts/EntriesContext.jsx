import { createContext, useState } from "react";
import api from "../services/Api"

export const EntriesContext = createContext()

function EntriesProvider({ children }) {
    const [cart, setCart] = useState([])
    const [oldCart, setOldCart] = useState([])
    const [produto, setProduto] = useState([])
    const [update, setUpdate] = useState(false)
    const [orderID, setOrderID] = useState(undefined)

    const getOrderForEdit = async (order) => {
        const { data } = await api.get("/entradas/order/" + order)
        setCart(data)
        setOldCart(JSON.parse(JSON.stringify(data)))
        //fazendo copia profunda para retirar a referencia do objeto
    }

    return (
        <EntriesContext.Provider value={{ setCart, cart, getOrderForEdit, 
        setUpdate, update, oldCart, orderID, setOrderID, setProduto,produto }}>
            {children}
        </EntriesContext.Provider>
    )
}
export default EntriesProvider