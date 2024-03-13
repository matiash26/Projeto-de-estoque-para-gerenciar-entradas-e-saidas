import { useSelector, useDispatch } from "react-redux";

//Actions
import { AlertClear } from "../../redux/alert/actions";

//Selectors
import { selectAlert } from "../../redux/selectors";

//Icons
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";

import "./style.css";
import { useEffect } from "react";

function Notification() {
  const dispatch = useDispatch();
  const { status, message } = useSelector(selectAlert);
  const handleClose = () => {
    dispatch(AlertClear());
  };
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(AlertClear());
    }, 2000);
    return () => clearInterval(interval);
  }, [message]);
  return (
    <div className={`notification ${status}`}>
      <span className="btnExit" onClick={handleClose}>
        &times;
      </span>
      {alert?.status === "success" ? (
        <AiOutlineCheckCircle />
      ) : (
        <FiAlertCircle />
      )}
      <div className="notification-msg">
        <span>{status}</span>
        <p>{message}</p>
      </div>
    </div>
  );
}
export default Notification;
