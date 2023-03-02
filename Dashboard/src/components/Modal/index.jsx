import { GlobalContext } from "../../Contexts/GlobalContext"
import { useContext } from "react"
import { FiX } from "react-icons/fi"
import "./style.css"

function Modal({ children, icon, title, setObject, clearModal }) {
    const {btnModalIsOpen } = useContext(GlobalContext)

    const handleModal = () => {
        btnModalIsOpen()
        setObject(false)
        clearModal([])
    }
    return (
        <div className={`modal-container`}>
            <div className="modal-content">
                <div className="modal-header">
                    <p className="exitModal" onClick={handleModal}><FiX /></p>
                    {icon}
                    <h2>{title}</h2>
                </div>
                {children}
            </div>
        </div>
    )
}
export default Modal