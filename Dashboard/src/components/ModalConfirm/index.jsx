import { GlobalContext } from "../../Contexts/GlobalContext"
import { useContext } from "react"
import "./style.css"

function ModalConfirm({ title, desc, setObject }) {
    const { btnModalConfirmIsOpen, setModalConfirmValue } = useContext(GlobalContext)
    const closeModal = ()=>{
        setObject(false)
        btnModalConfirmIsOpen()
    }
    const cancel = () => {
        btnModalConfirmIsOpen()
        setModalConfirmValue(false)
        setObject(false)
    }
    const accept = async () => {
        btnModalConfirmIsOpen()
        setModalConfirmValue(true)
    }
    return (
        <div className="modalConfirm">
            <div className="confirm-container">
                <div className="text-confirm">
                    <p>{title}</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <p>{desc}</p>
                <div className="btn-confirm">
                    <button onClick={cancel}>Cancel</button>
                    <button onClick={accept}>OK</button>
                </div>
            </div>
        </div>
    )
}
export default ModalConfirm