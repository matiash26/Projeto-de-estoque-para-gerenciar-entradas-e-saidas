import { useState, createContext } from "react";
export const ServiceContext = createContext('')

function ServiceProvider({ children }) {
    const [updateOrDelete, setUpdateOrDelete] = useState('')
    const [servico, setServico] = useState('')
    const [gasto, setGasto] = useState('')
    const [index, setIndex] = useState(undefined)
    
    const btnEdit = (data) => {
        setServico(data.servico)
        setGasto(data.gasto)
        setUpdateOrDelete(data)
    }
    const clearFields = () => {
        setServico('')
        setGasto('')
    }
    return (
        <ServiceContext.Provider value={{ servico, setServico, gasto, setGasto, updateOrDelete, setUpdateOrDelete, setIndex, index, clearFields, btnEdit}}>
            {children}
        </ServiceContext.Provider>
    )
}
export default ServiceProvider