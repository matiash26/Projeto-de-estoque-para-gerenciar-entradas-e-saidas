import { FiXCircle } from "react-icons/fi"
import "./style.css"
function AlertLogin({ alert }) {
    return (
        <div className="alertLoginContainer">
            <div className="alertLogin">
                <FiXCircle />
                <p>{alert.message}</p>
            </div>
        </div>
    )
}
export default AlertLogin;