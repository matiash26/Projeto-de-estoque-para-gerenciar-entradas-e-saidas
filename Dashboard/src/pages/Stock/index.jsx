import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import { productListAdd, addStockTable } from "../../redux/stock/action";
import {
  modalClearAll,
  modalConfirmToggle,
  ModalTableEdit,
} from "../../redux/modals/actions";

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
  const [copyTable, setCopyTable] = useState([]);
  const filterRef = useRef("");
  const statusRef = useRef("");
  const dispatch = useDispatch();

  const { modal, answer, tableEdit, modalConfirm } = useSelector(selectModals);
  const { stockTable } = useSelector(selectStock);
  const { message } = useSelector(selectAlert);

  const handleDeleteProduct = async () => {
    const id = tableEdit.id;
    const active = tableEdit.active;
    const { data } = await api.delete(`/stock/${id}?active=${active}`);
    dispatch(AlertAdd(data));
    dispatch(modalConfirmToggle(false));
    dispatch(modalClearAll());
  };
  const handleFilter = async () => {
    const filter = filterRef.current.value;
    const active = statusRef.current.value;
    if (filter || active) {
      const { data } = await api.get(
        `/stock/?search=${filter}&active=${active}`
      );
      setCopyTable(data);
    } else {
      const { data } = await api.get("/stock/all");
      setCopyTable(data);
    }
  };
  const fetchData = async () => {
    const products = await api.get("/product/filtered");
    const stock = await api.get("/stock/all");
    dispatch(productListAdd(products.data));
    dispatch(addStockTable(stock.data));
    setCopyTable(stock.data);
  };
  useEffect(() => {
    if (answer) {
      handleDeleteProduct();
    }
    fetchData();
  }, [answer, message]);
  return (
    <div className="Container-Main">
      {modal && <ModalStock />}
      <main className="main-content">
        {modalConfirm && (
          <ModalConfirm
            title="Deletar o produto"
            desc="Você realmente deseja desativar o produto?"
          />
        )}
        <NavbarSearch
          btnFilter={handleFilter}
          search={filterRef}
          status={statusRef}
        />
        <section className="table-content">
          <Pagination dataItem={copyTable} itemTable={addStockTable} />
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
