import { useSelector, useDispatch } from "react-redux";

//Actions
import { ModalTableEdit, modalToggle } from "../../redux/modals/actions";
import {
  serviceAdd,
  serviceInputValue,
  serviceClearnInputValue,
  serviceClear,
  serviceUpdateOrSubmit,
} from "../../redux/service/actions";

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
    dispatch(serviceUpdateOrSubmit(tableEdit, serviceName, spent));
    handleCloseModal();
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
