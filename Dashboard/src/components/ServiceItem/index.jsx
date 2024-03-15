import { useDispatch } from "react-redux";

//Actions
import { serviceEdit, serviceRemove } from "../../redux/service/actions";

//Icons
import { FiX } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";

import "./style.css";

function ServiceItem({ service }) {
  const dispatch = useDispatch();

  const handleEditService = () => {
    dispatch(serviceEdit(service.serviceName));
  };
  const handleRemoveService = () => {
    dispatch(serviceRemove(service.serviceName));
  };
  return (
    <li className="modal-item">
      <div>
        <h3>Serviço</h3>
        <p>{service.serviceName}</p>
      </div>
      <div>
        <h3>Gasto</h3>
        <p>R$: {service.spent}</p>
      </div>
      <div className="btn-options">
        <button className="btn-modal edit-btn" onClick={handleEditService}>
          <BsFillPencilFill />
        </button>
        <button className="btn-modal remove-btn" onClick={handleRemoveService}>
          <FiX />
        </button>
      </div>
    </li>
  );
}
export default ServiceItem;
