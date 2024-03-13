import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/Api";

//Actions
import { AlertAdd } from "../../redux/alert/actions";
import { ReplyModalConfirm } from "../../redux/modals/actions";
import { productTabletAdd } from "../../redux/product/action";

//selectors
import {
  selectAlert,
  selectModals,
  selectProducts,
} from "../../redux/selectors";

//components
import DataTableProducts from "../../components/DataTableProducts";
import NavbarSearch from "../../components/NavbarSearch";
import ModalConfirm from "../../components/ModalConfirm";
import Pagination from "../../components/Pagination";
import ModalProducts from "../../components/modalProducts";
import Table from "../../components/Table";

import "./style.css";

function Products() {
  const [copyTable, setCopyTable] = useState([]);
  const statusRef = useRef("");
  const filterRef = useRef("");

  const dispatch = useDispatch();

  const { modal, tableEdit, answer, modalConfirm } = useSelector(selectModals);
  const { productTable } = useSelector(selectProducts);
  const { message } = useSelector(selectAlert);
  const handleDeleteProduct = async () => {
    const id = tableEdit.id;
    const active = tableEdit.status;
    const { data } = await api.delete(`/product/${id}?status=${active}`);
    dispatch(AlertAdd(data));
  };
  const handleFilter = async () => {
    const filter = filterRef.current.value;
    const status = statusRef.current.value;
    if (filter || status) {
      const { data } = await api.get(
        `/product/?search=${filter}&status=${status}`
      );
      dispatch(productTabletAdd(data));
    } else {
      const { data } = await api.get("/product");
      dispatch(productTabletAdd(data));
    }
  };
  const fetchAllData = async () => {
    const { data } = await api.get("/product/all");
    if (data.status != "error") {
      dispatch(productTabletAdd(data));
      setCopyTable(data);
    }
  };
  useEffect(() => {
    if (answer) {
      handleDeleteProduct();
      dispatch(ReplyModalConfirm(false));
    }
    fetchAllData();
  }, [answer, message]);
  return (
    <div className="Container-Main">
      <main className="main-content">
        {modal && <ModalProducts />}
        {modalConfirm && (
          <ModalConfirm
            title="Ocultar"
            desc="Você realmente deseja ocultar o produto?"
          />
        )}
        <NavbarSearch
          btnFilter={handleFilter}
          search={filterRef}
          status={statusRef}
        />
        <section className="table-content">
          <Pagination dataItem={copyTable} itemTable={productTabletAdd} />
          <Table th={["#id", "produtos", "status", "valor"]}>
            {productTable?.map((product) => (
              <DataTableProducts key={product.id} data={product} />
            ))}
          </Table>
        </section>
      </main>
    </div>
  );
}
export default Products;
