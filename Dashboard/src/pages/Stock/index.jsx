import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//Actions
import {
  addStockTable,
  stockFetchAllData,
  stockFilter,
  stockDelete,
} from "../../redux/stock/action";
import { modalClearAll, modalConfirmToggle } from "../../redux/modals/actions";

//selectors
import { selectAlert, selectModals, selectStock } from "../../redux/selectors";

//components
import Table from "../../components/Table";
import ModalStock from "../../components/ModalStock";
import Pagination from "../../components/Pagination";
import NavbarSearch from "../../components/NavbarSearch";
import ModalConfirm from "../../components/ModalConfirm";
import DataTableStock from "../../components/DataTableStock";

import "./style.css";

function Stock() {
  const filterRef = useRef("");
  const statusRef = useRef("");
  const dispatch = useDispatch();

  const { modal, answer, tableEdit, modalConfirm } = useSelector(selectModals);
  const { stockTable, copyStockTable } = useSelector(selectStock);
  const { message } = useSelector(selectAlert);

  const handleDeleteProduct = () => {
    const id = tableEdit.id;
    const status = tableEdit.status;
    dispatch(stockDelete(id, status));
    dispatch(modalConfirmToggle(false));
    dispatch(modalClearAll());
  };
  const handleFilter = () => {
    const filter = filterRef.current.value;
    const active = statusRef.current.value;
    dispatch(stockFilter(filter, active));
  };
  useEffect(() => {
    if (answer) {
      handleDeleteProduct();
    }
    dispatch(stockFetchAllData());
  }, [answer, message]);
  return (
    <div className="Container-Main">
      {modal && <ModalStock />}
      <main className="main-content">
        {modalConfirm && (
          <ModalConfirm
            title="Aviso"
            desc={
              "se o estoque foi utilizado nas entradas, ele será desativado e para ativar novamente, basta clicar em (desativar/deletar), caso ao ele será deletado!"
            }
          />
        )}
        <NavbarSearch
          btnFilter={handleFilter}
          search={filterRef}
          status={statusRef}
        />
        <section className="table-content">
          <Pagination dataItem={copyStockTable} addTable={addStockTable} />
          <Table
            th={["#ID", "produto", "data", "status", "em estoque", "preço"]}
          >
            {stockTable?.map((product) => (
              <DataTableStock key={product.id} data={product} />
            ))}
          </Table>
        </section>
      </main>
    </div>
  );
}
export default Stock;
