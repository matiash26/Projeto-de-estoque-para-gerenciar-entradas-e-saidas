import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import { modalClearAll } from "../../redux/modals/actions";
import {
  entriesAddToProductList,
  entriesAddTable,
  entriesAddModalData,
  entriesClear,
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
  const [copyTable, setCopyTable] = useState([]);

  const dispatch = useDispatch();

  const { modal, tableEdit, modalConfirm, answer } = useSelector(selectModals);
  const { entriesTable } = useSelector(selectEntries);
  const { message } = useSelector(selectAlert);

  const startDateRef = useRef("");
  const offsetDateRef = useRef("");

  const handleFilter = async () => {
    const startDate = startDateRef.current.value;
    const offsetDate = offsetDateRef.current.value;
    if (startDate && offsetDate) {
      const { data } = await api.get(
        `/entries/filter/${startDate}/${offsetDate}`
      );
      dispatch(entriesAddTable(data));
    }
    if (!entriesTable.length) {
      fetchAllData();
      startDateRef.current.value = "";
      offsetDateRef.current.value = "";
    }
  };
  const handleDelete = async () => {
    const orderId = tableEdit?.pedido;
    const response = await api.delete("/entries/" + orderId);
    dispatch(AlertAdd(response.data));
    dispatch(modalClearAll());
    dispatch(entriesClear());
  };
  const fetchOrder = async () => {
    const order = await api.get("/entries/order/" + tableEdit.pedido);
    dispatch(entriesAddModalData(order.data));
  };
  const fetchAllData = async () => {
    const entries = await api.get("/entries/all");
    const stock = await api.get("/stock/all");
    if (entries.statusText === "OK" && stock.statusText === "OK") {
      dispatch(entriesAddToProductList(stock.data));
      setCopyTable(entries.data);
    }
  };
  useEffect(() => {
    if (tableEdit?.pedido) {
      fetchOrder();
    }
    if (answer) {
      handleDelete();
    }
    fetchAllData();
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
