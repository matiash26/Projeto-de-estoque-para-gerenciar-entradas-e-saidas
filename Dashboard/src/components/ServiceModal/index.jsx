import { useSelector, useDispatch } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import { ModalTableEdit, modalToggle } from "../../redux/modals/actions";
import {
  serviceAdd,
  serviceInputValue,
  serviceClearnInputValue,
  serviceClear,
} from "./../../redux/service/action";

//Selectors
import { selectModals, selectService } from "../../redux/selectors";

//Components
import ServiceItem from "./../ServiceItem";
import Modal from "./../Modal";
import Input from "./../Input";

//Icons
import { BiBox } from "react-icons/bi";

export default function ServiceModal() {
  const dispatch = useDispatch();

  const { service, serviceName, spent } = useSelector(selectService);
  const { tableEdit } = useSelector(selectModals);

  const handleAddServiceModal = () => {
    dispatch(serviceAdd());
    dispatch(serviceClearnInputValue());
  };
  const handleInputService = (element) => {
    dispatch(serviceInputValue(element));
  };
  const handleCloseModal = () => {
    dispatch(modalToggle());
    dispatch(serviceClearnInputValue());
    dispatch(ModalTableEdit({}));
    dispatch(serviceClear());
  };
  const handleSubmit = async () => {
    const method = tableEdit.id ? "put" : "post";
    const body = tableEdit?.id
      ? {
          id: tableEdit.id,
          servico: serviceName,
          gasto: spent,
        }
      : service;
    const { data } = await api[method]("/services/", body);
    if (data.status === "success") {
      dispatch(serviceClear());
      handleCloseModal();
      
    }
    dispatch(AlertAdd(data));
  };
  return (
    <Modal
      title="ADICIONAR AO ESTOQUE"
      icon={<BiBox />}
      add={handleAddServiceModal}
      exit={handleCloseModal}
      onSubmit={handleSubmit}
    >
      <form className="form-pop">
        <div className="form-content">
          <Input
            title="Serviço"
            type="text"
            name="serviceName"
            value={serviceName}
            onChange={({ target }) => handleInputService(target)}
          />
          <Input
            title="Gasto"
            type="number"
            name="spent"
            value={spent}
            onChange={({ target }) => handleInputService(target)}
          />
        </div>
      </form>
      <ol className="form-items">
        {service.map((item) => (
          <ServiceItem key={item.serviceName} service={item} />
        ))}
      </ol>
    </Modal>
  );
}
