import { createContext, useState } from "react"

export const GlobalContext = createContext('')

function GlobalProvider({ children }) {
    const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false)
    const [modalConfirmValue, setModalConfirmValue] = useState(false)
    const [modalValue, setModalValue] = useState(false)

    const btnModalConfirmIsOpen = () => {
        setModalConfirmIsOpen(prev => !prev)
    }
    const btnModalIsOpen = () => {
        setModalValue(prev => !prev)
    }
    return (
        <GlobalContext.Provider value={{
            modalValue, btnModalIsOpen,
            modalConfirmIsOpen, btnModalConfirmIsOpen,
            modalConfirmValue, setModalConfirmValue,    
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider