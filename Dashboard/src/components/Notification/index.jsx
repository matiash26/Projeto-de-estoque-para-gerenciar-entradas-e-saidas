import { AiOutlineCheckCircle } from "react-icons/ai"
import { FiAlertCircle } from "react-icons/fi"
import "./style.css"

function Notification({ alert, setAlert }) {
    return (
        <div className={`notification ${alert?.status}`}>
            <span className="btnExit" onClick={() => setAlert('')}>&times;</span>
            {alert?.status === "success" ? <AiOutlineCheckCircle /> : <FiAlertCircle />}
            <div className="notification-msg">
                <span>{alert?.status}</span>
                <p>{alert?.message}</p>
            </div>
        </div>)
}
export default Notification