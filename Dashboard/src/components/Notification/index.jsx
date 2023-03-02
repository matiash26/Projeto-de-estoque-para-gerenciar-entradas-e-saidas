import { useEffect, useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { FiAlertCircle } from "react-icons/fi"
import "./style.css"

function Notification({ alert }) {
    const [notificationModal, setNotificationModal] = useState(false)
    
    const handleExitNotification = () =>{
        setNotificationModal("hidden")
    }
    useEffect(()=>{
        setNotificationModal("")
    },[alert])
    return (
        <div className={`notification ${alert?.status} ${notificationModal}`}>
            <span className="btnExit" onClick={handleExitNotification}>&times;</span>
            {alert?.status === "success" ? <AiOutlineCheckCircle /> : <FiAlertCircle />}
            <div className="notification-msg">
                <span>{alert?.status}</span>
                <p>{alert?.message}</p>
            </div>
        </div>)
}
export default Notification