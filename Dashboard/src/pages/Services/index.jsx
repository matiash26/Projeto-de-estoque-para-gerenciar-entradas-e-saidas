import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import { ReplyModalConfirm, modalClearAll } from "../../redux/modals/actions";
import { serviceClear, serviceDatabase } from "../../redux/service/actions";

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
  const [copyTable, setCopyTable] = useState([]);
  const startDateRef = useRef("");
  const offsetDateRef = useRef("");

  const dispatch = useDispatch();

  const { message } = useSelector(selectAlert);
  const { serviceFromDB } = useSelector(selectService);
  const { modal, modalConfirm, answer, tableEdit } = useSelector(selectModals);

  const handleDeleteService = async () => {
    const id = tableEdit?.id;
    const { data } = await api.delete(`/services/${id}`);
    dispatch(modalClearAll());
    dispatch(serviceClear());
    dispatch(AlertAdd(data));
  };
  const handleFilter = async () => {
    const startDate = startDateRef.current.value;
    const offsetDate = offsetDateRef.current.value;
    if (startDate && offsetDate) {
      const { data } = await api.get(
        `/services/filter/${startDate}/${offsetDate}`
      );
      dispatch(serviceDatabase(data));
      offsetDateRef.current.value = "";
      startDateRef.current.value = "";
      return;
    }
    if (!serviceFromDB.length) {
      fetchData();
      startDateRef.current.value = "";
      offsetDateRef.current.value = "";
    }
  };
  const fetchData = async () => {
    try {
      const response = await api.get("/services/all");
      if (response.data) {
        setCopyTable(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (answer) {
      handleDeleteService();
      dispatch(ReplyModalConfirm(false));
    }
    fetchData();
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
          <Pagination dataItem={copyTable} addTable={serviceDatabase} />
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
