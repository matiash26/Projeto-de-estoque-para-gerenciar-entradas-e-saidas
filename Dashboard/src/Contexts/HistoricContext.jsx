import { createContext, useState } from "react";
import api from "../services/Api"

export const HistoricContext = createContext()

function HistoricProvider({ children }) {
    const [cart, setCart] = useState([])
    const [oldCart, setOldCart] = useState([])
    const [update, setUpdate] = useState(false)
    const [orderID, setOrderID] = useState(undefined)

    const getOrderForEdit = async (order) => {
        const { data } = await api.get("/historico/order/" + order)
        setCart(data)
        setOldCart(JSON.parse(JSON.stringify(data)))
        //fazendo copia profunda para retirar a referencia do objeto
    }

    return (
        <HistoricContext.Provider value={{ setCart, cart, getOrderForEdit, 
        setUpdate, update, oldCart, orderID, setOrderID }}>
            {children}
        </HistoricContext.Provider>
    )
}
export default HistoricProvider