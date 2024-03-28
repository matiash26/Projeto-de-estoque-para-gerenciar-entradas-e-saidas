import { useDispatch } from "react-redux";

//Actions
import {
  ReplyModalConfirm,
  modalClearAll,
  modalConfirmToggle,
} from "../../redux/modals/actions";

import "./style.css";

function ModalConfirm({ title, desc, clearData }) {
  const dispatch = useDispatch();

  const cancel = () => {
    dispatch(modalConfirmToggle());
    dispatch(modalClearAll());
    dispatch(clearData());
  };
  const accept = () => {
    dispatch(modalConfirmToggle());
    dispatch(ReplyModalConfirm(true));
  };
  return (
    <div className="modalConfirm">
      <div className="confirm-container">
        <div className="text-confirm">
          <p>{title}</p>
          <span onClick={cancel}>&times;</span>
        </div>
        <p>{desc}</p>
        <div className="btn-confirm">
          <button onClick={cancel}>Cancel</button>
          <button onClick={accept}>OK</button>
        </div>
      </div>
    </div>
  );
}
export default ModalConfirm;
