import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { modalClearAll } from "../../redux/modals/actions";
import {
  entriesAddTable,
  entriesClear,
  entriesFetchAll,
  entriesOrder,
  entriesFilter,
  entriesOrderDelete,
} from "../../redux/entries/actions";

//selectors
import {
  selectAlert,
  selectEntries,
  selectModals,
} from "../../redux/selectors";

//components
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import NavbarSearch from "../../components/NavbarSearch";
import ModalEntries from "../../components/ModalEntries";
import ModalConfirm from "../../components/ModalConfirm";
import DataTableEntries from "../../components/DataTableEntries";

import "./style.css";

function Entries() {
  const { modal, tableEdit, modalConfirm, answer } = useSelector(selectModals);
  const { entriesTable, copyTable } = useSelector(selectEntries);
  const { message } = useSelector(selectAlert);

  const dispatch = useDispatch();

  const startDateRef = useRef("");
  const offsetDateRef = useRef("");

  const handleFilter = () => {
    const startDate = startDateRef.current.value;
    const offsetDate = offsetDateRef.current.value;
    if (startDate || offsetDate) {
      dispatch(entriesFilter({ startDate, offsetDate }));
    }
    if (!entriesTable.length) {
      dispatch(entriesFetchAll());
      startDateRef.current.value = "";
      offsetDateRef.current.value = "";
    }
  };
  const handleDelete = () => {
    const orderId = tableEdit?.pedido;
    dispatch(entriesOrderDelete(orderId));
    dispatch(modalClearAll());
  };
  const fetchOrder = () => {
    dispatch(entriesOrder(tableEdit.pedido));
  };
  useEffect(() => {
    if (tableEdit?.pedido) {
      fetchOrder();
    }
    if (answer) {
      handleDelete();
    }
    dispatch(entriesFetchAll());
  }, [tableEdit, message, answer]);
  return (
    <div className="Container-Main">
      {modal && <ModalEntries />}
      {modalConfirm && (
        <ModalConfirm
          clearData={entriesClear}
          title="Aviso"
          desc="Você realmente deseja deletar o pedido?"
        />
      )}
      <main className="main-content">
        <NavbarSearch
          entrada={startDateRef}
          saida={offsetDateRef}
          withDate={true}
          btnFilter={handleFilter}
          value="Filtro"
        />
        <section className="table-content">
          <Pagination dataItem={copyTable} addTable={entriesAddTable} />
          <Table th={["#id", "pedido", "data do pedido", "produtos", "total"]}>
            {entriesTable?.map((item) => (
              <DataTableEntries key={item.pedido} data={item} />
            ))}
          </Table>
        </section>
      </main>
    </div>
  );
}
export default Entries;
