import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { ReplyModalConfirm } from "../../redux/modals/actions";
import {
  productDelete,
  productFetchAllData,
  productFilter,
  productTabletAdd,
} from "../../redux/product/action";

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
  const statusRef = useRef("");
  const filterRef = useRef("");

  const dispatch = useDispatch();

  const { modal, tableEdit, answer, modalConfirm } = useSelector(selectModals);
  const { productTable, copyTable } = useSelector(selectProducts);
  const { message } = useSelector(selectAlert);

  const handleDeleteProduct = () => {
    const id = tableEdit.id;
    const active = tableEdit.status;
    dispatch(productDelete(id, active));
  };

  const handleFilter = () => {
    const filter = filterRef.current.value;
    const status = statusRef.current.value;
    dispatch(productFilter(filter, status));
  };

  useEffect(() => {
    if (answer) {
      handleDeleteProduct();
      dispatch(ReplyModalConfirm(false));
    }
    dispatch(productFetchAllData());
  }, [answer, message]);
  return (
    <div className="Container-Main">
      <main className="main-content">
        {modal && <ModalProducts />}
        {modalConfirm && (
          <ModalConfirm
            title="Aviso"
            desc={
              "se o produto foi utilizado no estoque, ele será desativado e para ativar novamente, basta clicar em (atualizar), caso ao ele será deletado"
            }
          />
        )}
        <NavbarSearch
          btnFilter={handleFilter}
          search={filterRef}
          status={statusRef}
        />
        <section className="table-content">
          <Pagination dataItem={copyTable} addTable={productTabletAdd} />
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
