import { useSelector } from "react-redux";

//Selectors
import { selectModals } from "../../redux/selectors";

//Icons
import { FiX } from "react-icons/fi";

//Components
import Button from "../Button";

import "./style.css";

function Modal({ children, icon, title, onSubmit, exit, add }) {
  const { tableEdit } = useSelector(selectModals);
  return (
    <div className={`modal-container`}>
      <div className="modal-content">
        <div className="modal-header">
          <p className="exitModal" onClick={exit}>
            <FiX />
          </p>
          {icon}
          <h2>{title}</h2>
        </div>
        {children}
        <div className="modal-btn">
          {tableEdit?.data || tableEdit?.id ? (
            <Button
              title="ATUALIZAR"
              className="blue"
              type="button"
              onClick={onSubmit}
            />
          ) : (
            <>
              <Button
                title="FINALIZAR"
                type="submit"
                className="green"
                onClick={onSubmit}
              />
              <Button
                title="ADICIONAR"
                type="button"
                className="poolBlue"
                onClick={add}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Modal;
