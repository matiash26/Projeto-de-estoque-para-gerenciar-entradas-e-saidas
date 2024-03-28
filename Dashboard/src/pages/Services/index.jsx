import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { ReplyModalConfirm, modalClearAll } from "../../redux/modals/actions";
import {
  serviceClear,
  serviceDatabase,
  serviceDelete,
  serviceFetchData,
  serviceFilter,
} from "../../redux/service/actions";

//selectors
import {
  selectService,
  selectAlert,
  selectModals,
} from "../../redux/selectors";

//components
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import ServiceModal from "../../components/ServiceModal";
import ModalConfirm from "../../components/ModalConfirm";
import NavbarSearch from "../../components/NavbarSearch";
import DataTableService from "../../components/DataTableService";

function Service() {
  const startDateRef = useRef("");
  const offsetDateRef = useRef("");

  const dispatch = useDispatch();

  const { message } = useSelector(selectAlert);
  const { serviceFromDB, serviceCopyTable } = useSelector(selectService);
  const { modal, modalConfirm, answer, tableEdit } = useSelector(selectModals);

  const handleDeleteService = async () => {
    const id = tableEdit?.id;
    dispatch(serviceDelete(id));
    dispatch(modalClearAll());
    dispatch(serviceClear());
  };

  const handleFilter = async () => {
    const startDate = startDateRef.current.value;
    const offsetDate = offsetDateRef.current.value;

    dispatch(serviceFilter(startDate, offsetDate));

    offsetDateRef.current.value = "";
    startDateRef.current.value = "";
  };

  useEffect(() => {
    if (answer) {
      handleDeleteService();
      dispatch(ReplyModalConfirm(false));
    }
    dispatch(serviceFetchData());
  }, [message, answer]);
  return (
    <div className="Container-Main">
      <main className="main-content">
        {modal && <ServiceModal />}
        {modalConfirm && (
          <ModalConfirm
            title="Aviso"
            desc="Você realmente deseja deletar o serviço?"
          />
        )}
        <NavbarSearch
          entrada={startDateRef}
          saida={offsetDateRef}
          withDate={true}
          btnFilter={handleFilter}
          value="Filtro"
        />
        <section className="table-content">
          <Pagination dataItem={serviceCopyTable} addTable={serviceDatabase} />
          <Table th={["#ID", "serviço", "data", "gasto"]}>
            {serviceFromDB?.map((service) => (
              <DataTableService key={service.id} data={service} />
            ))}
          </Table>
        </section>
      </main>
    </div>
  );
}
export default Service;
